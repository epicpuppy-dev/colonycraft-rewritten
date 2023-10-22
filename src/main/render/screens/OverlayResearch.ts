import { ColonyCraft } from "../../ColonyCraft";
import { Technology } from "../../content/colony/research/Technology";
import { KeyAction } from "../../player/KeyAction";
import { KeyBind } from "../../player/KeyBind";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ClickHandler } from "../ui/ClickHandler";
import { ScrollBar } from "../ui/ScrollBar";

export class OverlayResearch extends Screen {
    private closeButton: Button;
    private rowScroll: number = 0;
    private technologiesAvailable: Technology[] = [];
    private selectionClickable: ClickHandler;
    private scrollBar: ScrollBar;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("research"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("research");
        });

        let areaWidth = 3 * this.width / 4 - 24;
        this.selectionClickable = new ClickHandler(Math.floor(this.width / 8), Math.floor(this.height / 8), Math.floor(areaWidth), Math.floor(3 * this.height / 4), (game: ColonyCraft, x: number, y: number) => {
            if ((y - this.height / 8 - 56) % 124 > 104) return;
            const row = Math.floor((y - this.height / 8 - 56) / 124 );
            if ((x - this.width / 8) % (areaWidth / 4) < 10 || (x - this.width / 8) % (areaWidth / 2) > (areaWidth / 2 - 10)) return;
            const column = x - this.width / 8 < areaWidth / 2 ? 0 : 1;
            const index = row * 2 + column + (game.colony.research.active != null ? -2 : 0);
            if (index >= this.technologiesAvailable.length || index < 0 || this.technologiesAvailable[index].unlocked) return;
            game.colony.research.active = this.technologiesAvailable[index];
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("research");
        });
        
        game.mouse.registerClickable(this.closeButton);
        game.mouse.registerClickable(this.selectionClickable, -10);
        
        game.key.addAction(new KeyAction("closeResearch", "Close Research", (game: ColonyCraft) => {
            if (game.currentScreens.includes("research")) {
                game.currentScreens.splice(game.currentScreens.indexOf("research"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));
        game.draw.addCloseAction(game.key.actions.closeResearch);

        game.key.addAction(new KeyAction("openResearch", "Open Research", (game: ColonyCraft) => {
            if (game.currentScreens.includes("game") && !game.currentScreens.includes("overlay")) game.currentScreens.push("research", "overlay");
            else if (game.currentScreens.includes("research")) {
                game.currentScreens.splice(game.currentScreens.indexOf("research"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));

        game.key.addBinding(new KeyBind("Open Research", "T", "KeyT", [game.key.actions.openResearch]));
        
        this.scrollBar = new ScrollBar(game, Math.floor(7 * this.width / 8 - 24), Math.floor(this.height / 8 + 56), 16, Math.floor(3 * this.height / 4 - 66), "v", 0, 5, 5, 124, (game) => game.currentScreens.includes("research"));
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        const research = game.colony.research;

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
        game.draw.textCenter("Discovery", Math.floor(this.width / 2), Math.floor(this.height / 8 + 12), 28, "white");

        //Row height = 124
        const maxRows = Math.floor((3 * this.height / 4 - 46) / 124);

        let currentRow = 0;
        let currentColumn = 0;
        this.technologiesAvailable = [];
        this.rowScroll = Math.max(this.scrollBar.value, 0);

        //Active research
        if (research.active != null) {
            currentRow++;
            //research name
            game.draw.textCenter(research.active.name, Math.floor(this.width / 2), Math.floor(this.height / 8 + 50), 14, "#FFFFFF");
            //progress bar
            const barWidth = Math.floor(3 * this.width / 4 - 20 - game.draw.textWidth("100%", 14));
            game.draw.text(`${Math.floor(research.active.progress * 100)}%`, Math.floor(this.width / 8 + 16) + barWidth, Math.floor(this.height / 8 + 74), 14, "#FFFFFF");
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 72), barWidth * research.active.progress, 20);
            ctx.strokeRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 72), barWidth, 20);

            const subBarWidth = Math.floor(3 * this.width / 4 - 20 - game.draw.textSmallWidth("1.00k / 1.00k Chemistry", 7));

            //invention
            if (research.active.needed.invention > 0) {
                ctx.fillStyle = '#1E90FF';
                ctx.fillRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 96), subBarWidth * research.active.current.invention / research.active.needed.invention, 8);
                ctx.strokeRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 96), subBarWidth, 8);
                game.draw.textSmall(`${game.draw.toShortNumber(research.active.current.invention)} / ${game.draw.toShortNumber(research.active.needed.invention)} Invention`, Math.floor(this.width / 8 + 16) + subBarWidth, Math.floor(this.height / 8 + 96), 7, "#1E90FF");
            }

            //math
            if (research.active.needed.math > 0) {
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 108), subBarWidth * research.active.current.math / research.active.needed.math, 8);
                ctx.strokeRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 108), subBarWidth, 8);
                game.draw.textSmall(`${game.draw.toShortNumber(research.active.current.math)} / ${game.draw.toShortNumber(research.active.needed.math)} Math`, Math.floor(this.width / 8 + 16) + subBarWidth, Math.floor(this.height / 8 + 108), 7, "#FFD700");
            }

            //physics
            if (research.active.needed.physics > 0) {
                ctx.fillStyle = '#48D1CC';
                ctx.fillRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 120), subBarWidth * research.active.current.physics / research.active.needed.physics, 8);
                ctx.strokeRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 120), subBarWidth, 8);
                game.draw.textSmall(`${game.draw.toShortNumber(research.active.current.physics)} / ${game.draw.toShortNumber(research.active.needed.physics)} Physics`, Math.floor(this.width / 8 + 16) + subBarWidth, Math.floor(this.height / 8 + 120), 7, "#48D1CC");
            }

            //chemistry
            if (research.active.needed.chemistry > 0) {
                ctx.fillStyle = '#FF4500';
                ctx.fillRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 132), subBarWidth * research.active.current.chemistry / research.active.needed.chemistry, 8);
                ctx.strokeRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 132), subBarWidth, 8);
                game.draw.textSmall(`${game.draw.toShortNumber(research.active.current.chemistry)} / ${game.draw.toShortNumber(research.active.needed.chemistry)} Chemistry`, Math.floor(this.width / 8 + 16) + subBarWidth, Math.floor(this.height / 8 + 132), 7, "#FF4500");
            }

            //biology
            if (research.active.needed.biology > 0) {
                ctx.fillStyle = '#32CD32';
                ctx.fillRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 144), subBarWidth * research.active.current.biology / research.active.needed.biology, 8);
                ctx.strokeRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 144), subBarWidth, 8);
                game.draw.textSmall(`${game.draw.toShortNumber(research.active.current.biology)} / ${game.draw.toShortNumber(research.active.needed.biology)} Biology`, Math.floor(this.width / 8 + 16) + subBarWidth, Math.floor(this.height / 8 + 144), 7, "#32CD32");
            }

            //quantum
            if (research.active.needed.quantum > 0) {
                ctx.fillStyle = '#FF42EE';
                ctx.fillRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 156), subBarWidth * research.active.current.quantum / research.active.needed.quantum, 8);
                ctx.strokeRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 156), subBarWidth, 8);
                game.draw.textSmall(`${game.draw.toShortNumber(research.active.current.quantum)} / ${game.draw.toShortNumber(research.active.needed.quantum)} Quantum`, Math.floor(this.width / 8 + 16) + subBarWidth, Math.floor(this.height / 8 + 156), 7, "#FF42EE");
            }
        }

        let areaWidth = 3 * this.width / 4 - 24;
        let leftOffset = this.width / 8;

        const researchesList = [];
        const researchedList = [];
        for (let i = 0; i < Object.keys(research.technologies).length; i++) {
            const technology = research.technologies[Object.keys(research.technologies)[i]];
            if (technology.unlocked) researchedList.push(technology);
            else researchesList.push(technology);
        }

        researchesList.push(...researchedList);

        for (let i = 0; i < researchesList.length; i++) {
            const technology = researchesList[i];
            if (technology === research.active) continue;
            let available = true;
            for (let j = 0; j < technology.prereqs.length; j++) {
                if (research.technologies[technology.prereqs[j]]) {
                    if (!research.technologies[technology.prereqs[j]].unlocked) available = false;
                } else if (game.colony.traits.traits[technology.prereqs[j]]) {
                    if (!game.colony.traits.traits[technology.prereqs[j]].unlocked) available = false;
                }
            }
            if (!available) continue;
            if (currentRow >= this.rowScroll + (research.active != null ? 1 : 0) && currentRow < this.rowScroll + maxRows) {
                this.technologiesAvailable.push(technology);
                if (technology.progress > 0 && !technology.unlocked) {
                    ctx.fillStyle = '#00ff00';
                    ctx.fillRect(Math.floor(leftOffset + currentColumn * areaWidth / 2 + 10), Math.floor(this.height / 8 + 56 + 124 * (currentRow - this.rowScroll)), Math.floor((areaWidth / 2 - 20) * technology.progress), 4)
                } else if (technology.unlocked) {
                    ctx.fillStyle = '#222c22';
                    ctx.fillRect(Math.floor(leftOffset + currentColumn * areaWidth / 2 + 10), Math.floor(this.height / 8 + 56 + 124 * (currentRow - this.rowScroll)), Math.floor(areaWidth / 2 - 20), 104);
                }
                ctx.strokeRect(Math.floor(leftOffset + currentColumn * areaWidth / 2 + 10), Math.floor(this.height / 8 + 56 + 124 * (currentRow - this.rowScroll)), Math.floor(areaWidth / 2 - 20), 104);
                game.draw.textCenter(technology.name, Math.floor(leftOffset + areaWidth / 4 + currentColumn * areaWidth / 2), Math.floor(this.height / 8 + 64 + 124 * (currentRow - this.rowScroll)), 14, "white");

                //draw description
                for (let j = 0; j < technology.desc.length; j++) {
                    game.draw.textSmallCenter(technology.desc[j], Math.floor(leftOffset + areaWidth / 4 + currentColumn * areaWidth / 2), Math.floor(this.height / 8 + 84 + 124 * (currentRow - this.rowScroll) + j * 12), 7, "#FFFFFF");
                }

                //draw cost
                if (!technology.unlocked) {
                    let cardWidth = areaWidth / 2 - 20;
                if (technology.needed.invention > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.invention - technology.current.invention), Math.floor(leftOffset + 10 + cardWidth / 12 + currentColumn * areaWidth / 2), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#1E90FF");
                if (technology.needed.math > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.math - technology.current.math), Math.floor(leftOffset + 10 + 3 * cardWidth / 12 + currentColumn * areaWidth / 2), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#FFD700");
                if (technology.needed.physics > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.physics - technology.current.physics), Math.floor(leftOffset + 10 + 5 * cardWidth / 12 + currentColumn * areaWidth / 2), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#48D1CC");
                if (technology.needed.chemistry > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.chemistry - technology.current.chemistry), Math.floor(leftOffset + 10 + 7 * cardWidth / 12 + currentColumn * areaWidth / 2), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#FF4500");
                if (technology.needed.biology > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.biology - technology.current.biology), Math.floor(leftOffset + 10 + 9 * cardWidth / 12 + currentColumn * areaWidth / 2), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#32CD32");
                if (technology.needed.quantum > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.quantum - technology.current.quantum), Math.floor(leftOffset + 10 + 11 * cardWidth / 12 + currentColumn * areaWidth / 2), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#FF42EE");
                }
            }
            currentColumn++;
            if (currentColumn > 1) {
                currentColumn = 0;
                currentRow++;
            }
        }
        if (currentColumn > 0) {
            currentRow++;
        }

        this.scrollBar.reposition(Math.floor(7 * this.width / 8 - 24), Math.floor(this.height / 8 + 56) + (research.active != null ? 124 : 0), 16, Math.floor(3 * this.height / 4 - 66) - (research.active != null ? 124 : 0));

        this.scrollBar.setBounds(this.rowScroll, maxRows - (research.active != null ? 1 : 0), Math.floor(currentRow - maxRows));
        this.scrollBar.render(ctx);

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("research");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}