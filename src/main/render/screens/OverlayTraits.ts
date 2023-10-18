import { ColonyCraft } from "../../ColonyCraft";
import { KeyAction } from "../../player/KeyAction";
import { KeyBind } from "../../player/KeyBind";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ScrollBar } from "../ui/ScrollBar";

export class OverlayTraits extends Screen {
    private closeButton: Button;
    private rowScroll: number = 0;
    private scrollBar: ScrollBar;

    constructor (game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("traits"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("traits");
        });
        
        game.mouse.registerClickable(this.closeButton);

        game.key.addAction(new KeyAction("closeTraits", "Close Traits", (game: ColonyCraft) => {
            if (game.currentScreens.includes("traits")) {
                game.currentScreens.splice(game.currentScreens.indexOf("traits"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));
        game.draw.addCloseAction(game.key.actions.closeTraits);

        game.key.addAction(new KeyAction("openTraits", "Open Traits", (game: ColonyCraft) => {
            if (game.currentScreens.includes("game") && !game.currentScreens.includes("overlay")) game.currentScreens.push("traits", "overlay");
            else if (game.currentScreens.includes("traits")) {
                game.currentScreens.splice(game.currentScreens.indexOf("traits"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));
        
        game.key.addBinding(new KeyBind("Open Traits", "E", "KeyE", [game.key.actions.openTraits]));

        this.scrollBar = new ScrollBar(game, Math.floor(7 * this.width / 8 - 24), Math.floor(this.height / 8 + 56), 16, Math.floor(3 * this.height / 4 - 66), "v", 0, 5, 5, 88, (game) => game.currentScreens.includes("traits"));
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.fillStyle = '#00000077';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 8), Math.floor(this.height / 8), Math.floor(3 * this.width / 4), Math.floor(3 * this.height / 4), 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();
        game.draw.sprite(ctx, "close", Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24);
        game.draw.textCenter("Current Traits", Math.floor(this.width / 2), Math.floor(this.height / 8 + 12), 28, "white");

        const rowHeight = 100
        const maxRows = Math.floor((3 * this.height / 4 - 46) / rowHeight);
        const traits = game.colony.traits;

        let currentRow = 0;
        let currentColumn = 0;

        this.rowScroll = Math.max(this.scrollBar.value, 0);

        let areaWidth = 3 * this.width / 4 - 24;
        let leftOffset = this.width / 8

        for (let i = 0; i < Object.keys(traits.traits).length; i++) {
            const trait = traits.traits[Object.keys(traits.traits)[i]];
            if (!trait.unlocked) continue;
            if (currentRow >= this.rowScroll && currentRow < maxRows + this.rowScroll) {
                ctx.strokeRect(Math.floor(leftOffset + currentColumn * areaWidth / 3 + 10), Math.floor(this.height / 8 + 56 + (currentRow - this.rowScroll) * rowHeight), Math.floor(areaWidth / 3 - 20), rowHeight - 20);
                game.draw.textCenter(trait.name, Math.floor(leftOffset + areaWidth / 6 + currentColumn * areaWidth / 3), Math.floor(this.height / 8 + 62 + (currentRow - this.rowScroll) * rowHeight), 14, "white");
                //trait type
                const color = trait.type === "s" ? "#8A2BE2" : trait.type === "c" ? "#ADFF2F" : trait.type === "p" ? "#FF7F50" : "#DAA520";
                game.draw.textSmallCenter(trait.type === "s" ? "Social" : trait.type === "c" ? "Cultural" : trait.type === "p" ? "Political" : "Religious", Math.floor(leftOffset + areaWidth / 6 + currentColumn * areaWidth / 3), Math.floor(this.height / 8 + 62 + (currentRow - this.rowScroll) * rowHeight + 20), 7, color);
                //description
                for (let j = 0; j < trait.desc.length; j++) {
                    game.draw.textSmallCenter(trait.desc[j], Math.floor(leftOffset + areaWidth / 6 + currentColumn * areaWidth / 3), Math.floor(this.height / 8 + 62 + (currentRow - this.rowScroll) * rowHeight + 30 + j * 10), 7, "white");
                }
            }
            currentColumn++;
            if (currentColumn > 2) {
                currentColumn = 0;
                currentRow++;
            }
        }
        if (currentColumn > 0) {
            currentRow++;
        }

        this.scrollBar.setBounds(this.rowScroll, maxRows, Math.floor(currentRow - maxRows));
        this.scrollBar.render(ctx);

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("traits");
    }
}