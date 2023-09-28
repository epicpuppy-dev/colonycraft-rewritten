import { game } from "../../..";
import { ColonyCraft } from "../../ColonyCraft";
import { Technology } from "../../content/colony/research/Technology";
import { KeyAction } from "../../player/KeyAction";
import { KeyBind } from "../../player/KeyBind";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ClickHandler } from "../ui/ClickHandler";

export class OverlayResearch extends Screen {
    private closeButton: Button;
    private rowScroll: number = 0;
    private technologiesAvailable: Technology[] = [];
    private selectionClickable: ClickHandler;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("research"), 1);
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("research");
        });

        this.selectionClickable = new ClickHandler(Math.floor(this.width / 8), Math.floor(this.height / 8), Math.floor(3 * this.width / 4), Math.floor(3 * this.height / 4), (game: ColonyCraft, x: number, y: number) => {
            if ((y - this.height / 8 - 56) % 124 > 104) return;
            const row = Math.floor((y - this.height / 8 - 56) / 124 );
            if ((x - this.width / 8 - 10) % (3 * this.width / 4) > 3 * this.width / 4 - 20) return;
            const column = x < this.width / 2 ? 0 : 1;
            const index = row * 2 + column + (game.colony.research.active != null ? -2 : 0);
            if (index >= this.technologiesAvailable.length || index < 0) return;
            game.colony.research.active = this.technologiesAvailable[index];
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("research");
        });
        
        game.mouse.registerClickable(this.closeButton);
        game.mouse.registerClickable(this.selectionClickable);
        
        game.key.addAction(new KeyAction("closeResearch", "Close Research", (game: ColonyCraft) => {
            if (game.currentScreens.includes("research")) game.currentScreens.splice(game.currentScreens.indexOf("research"), 1);
        }));
        game.draw.addCloseAction(game.key.actions.closeResearch);

        game.key.addAction(new KeyAction("openResearch", "Open Research", (game: ColonyCraft) => {
            if (game.currentScreens.includes("game") && !game.currentScreens.includes("research") && !game.currentScreens.includes("inventory")) game.currentScreens.push("research");
            else if (game.currentScreens.includes("research")) {
                game.currentScreens.splice(game.currentScreens.indexOf("research"), 1);
            }
        }));

        game.key.addBinding(new KeyBind("Open Research", "T", "KeyT", [game.key.actions.openResearch]));
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
        game.draw.textCenter("Research", Math.floor(this.width / 2), Math.floor(this.height / 8 + 12), 28, "white");

        //Row height = 124
        const maxRows = Math.floor((3 * this.height / 4 - 104) / 124);

        let currentRow = 0;
        let currentColumn = 0;
        this.technologiesAvailable = [];

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

        for (let i = 0; i < Object.keys(research.technologies).length; i++) {
            const technology = research.technologies[Object.keys(research.technologies)[i]];
            if (technology.unlocked || research.active === technology) continue;
            let available = true;
            for (let j = 0; j < technology.prereqs.length; j++) {
                if (!technology.prereqs[j].unlocked) available = false;
            }
            if (!available) continue;
            this.technologiesAvailable.push(technology);
            if (currentColumn > 1) {
                currentColumn = 0;
                currentRow++;
            }
            if (currentRow >= this.rowScroll && currentRow < this.rowScroll + maxRows) {
                if (technology.progress > 0) {
                    ctx.fillStyle = '#00ff00';
                    ctx.fillRect(Math.floor(this.width / 8 + currentColumn * 3 * this.width / 8 + 10), Math.floor(this.height / 8 + 56 + 124 * (currentRow - this.rowScroll)), Math.floor((3 * this.width / 8 - 20) * technology.progress), 4)
                }
                ctx.strokeRect(Math.floor(this.width / 8 + currentColumn * 3 * this.width / 8 + 10), Math.floor(this.height / 8 + 56 + 124 * (currentRow - this.rowScroll)), Math.floor(3 * this.width / 8 - 20), 104);
                game.draw.textCenter(technology.name, Math.floor(5 * this.width / 16 + currentColumn * 3 * this.width / 8), Math.floor(this.height / 8 + 64 + 124 * (currentRow - this.rowScroll)), 14, "white");

                //draw description
                for (let j = 0; j < technology.desc.length; j++) {
                    game.draw.textSmallCenter("- " + technology.desc[j], Math.floor(5 * this.width / 16 + currentColumn * 3 * this.width / 8), Math.floor(this.height / 8 + 84 + 124 * (currentRow - this.rowScroll) + j * 12), 7, "#FFFFFF");
                }

                //draw cost
                if (technology.needed.invention > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.invention - technology.current.invention), Math.floor(5 * this.width / 32 + currentColumn * 3 * this.width / 8), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#1E90FF");
                if (technology.needed.math > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.math - technology.current.math), Math.floor(7 * this.width / 32 + currentColumn * 3 * this.width / 8), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#FFD700");
                if (technology.needed.physics > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.physics - technology.current.physics), Math.floor(9 * this.width / 32 + currentColumn * 3 * this.width / 8), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#48D1CC");
                if (technology.needed.chemistry > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.chemistry - technology.current.chemistry), Math.floor(11 * this.width / 32 + currentColumn * 3 * this.width / 8), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#FF4500");
                if (technology.needed.biology > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.biology - technology.current.biology), Math.floor(13 * this.width / 32 + currentColumn * 3 * this.width / 8), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#32CD32");
                if (technology.needed.quantum > 0) game.draw.textCenter(game.draw.toShortNumber(technology.needed.quantum - technology.current.quantum), Math.floor(15 * this.width / 32 + currentColumn * 3 * this.width / 8), Math.floor(this.height / 8 + 140 + 124 * (currentRow - this.rowScroll)), 14, "#FF42EE");
                
                currentColumn++;
            }
        }

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