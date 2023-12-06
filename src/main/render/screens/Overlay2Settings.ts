import { ColonyCraft } from "../../ColonyCraft";
import { KeyAction } from "../../player/KeyAction";
import { KeyBind } from "../../player/KeyBind";
import { Screen } from "../Screen";
import { ClickHandler } from "../ui/ClickHandler";

export class Overlay2Settings extends Screen {
    private submenu: string = "controls";
    private rebindClickable: ClickHandler;
    private keysAvailable: (KeyBind | null)[] = [];

    constructor (game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);

        game.key.addAction(new KeyAction("closeSettings", "Close Settings", (game, prevScreens) => {
            if (prevScreens.includes("settings")) {
                game.currentScreens.splice(game.currentScreens.indexOf("settings"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay2"), 1);
            }
        }));

        game.draw.addCloseAction(game.key.actions.closeSettings);

        this.rebindClickable = new ClickHandler(Math.floor(3 * this.width / 4 - 128), Math.floor(this.height / 8 + 80 + 28 - 5), 120, Math.floor(3 * this.height / 4), (game, x, y) => {
            if ((y - Math.floor(this.height / 8 + 80 + 28 - 5)) % 28 > 24) return;
            let row = Math.floor((y - Math.floor(this.height / 8 + 80 + 28 - 5)) / 28);
            if (row < 0 || row >= this.keysAvailable.length) return;
            game.key.rebind = this.keysAvailable[row];
        }, (game) => game.currentScreens.includes("settings") && this.submenu == "controls");

        game.mouse.registerClickable(this.rebindClickable);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.fillStyle = '#00000077';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 4), Math.floor(this.height / 8), Math.floor(this.width / 2), Math.floor(3 * this.height / 4), 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#555555';
        game.draw.sprite(ctx, "close", Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24);
        game.draw.textCenter("Settings", Math.floor(this.width / 2), Math.floor(this.height / 8 + 8), 28, "white");

        //draw submenu selector
        ctx.fillStyle = '#444444';
        if (this.submenu == "controls") ctx.fillRect(Math.floor(this.width / 2 - 75), Math.floor(this.height / 8 + 48), 150, 24);
        ctx.strokeRect(Math.floor(this.width / 2 - 75), Math.floor(this.height / 8 + 48), 150, 24);
        game.draw.textCenter("Controls", Math.floor(this.width / 2), Math.floor(this.height / 8 + 52), 14, "white");

        if (this.submenu == "controls") {
            this.keysAvailable = [];
            let categories: {[key: string]: KeyBind[]} = {};
            for (let key in game.key.bindings) {
                let bind = game.key.bindings[key];
                if (bind.category == null) continue;
                if (categories[bind.category] == undefined) categories[bind.category] = [];
                categories[bind.category].push(bind);
            }

            let maxRows = Math.floor((3 * this.height / 4 - 80) / 28);
            let rows = 0;
            for (let category in categories) {
                if (rows >= maxRows) break;
                rows++;
                game.draw.textCenter(category, Math.floor(this.width / 2), Math.floor(this.height / 8 + 80 + 28 * rows), 14, "white");
                ctx.fillStyle = '#444444';
                ctx.fillRect(Math.floor(this.width / 4 + 8), Math.floor(this.height / 8 + 80 + 28 * rows + 7), Math.floor(this.width / 4 - 16 - game.draw.textWidth(category) / 2), 2);
                ctx.fillRect(Math.floor(this.width / 2 + 8 + game.draw.textWidth(category) / 2), Math.floor(this.height / 8 + 80 + 28 * rows + 7), Math.floor(this.width / 4 - 16 - game.draw.textWidth(category) / 2), 2);
                this.keysAvailable.push(null);
                for (let bind of categories[category]) {
                    if (rows >= maxRows) break;
                    rows++;
                    game.draw.text(bind.name, Math.floor(this.width / 4 + 8), Math.floor(this.height / 8 + 80 + 28 * rows), 14, "white");
                    game.draw.textCenter(bind.key, Math.floor(3 * this.width / 4 - 68), Math.floor(this.height / 8 + 80 + 28 * rows), 14, "white");
                    ctx.beginPath();
                    ctx.roundRect(Math.floor(3 * this.width / 4 - 128), Math.floor(this.height / 8 + 80 + 28 * rows - 5), 120, 24, 4);
                    if (game.key.rebind === bind) ctx.fill();
                    ctx.stroke();
                    this.keysAvailable.push(bind);
                }
            }
        }

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("settings");
    }
}