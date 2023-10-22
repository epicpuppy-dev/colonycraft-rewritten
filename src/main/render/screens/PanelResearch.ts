import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class PanelResearch extends Screen {
    private researchButton: Button;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.researchButton = new Button(0, 50, Math.floor(width / 3), 80, (game: ColonyCraft) => {
            game.currentScreens.push("research", "overlay");
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("game") && !game.currentScreens.includes("overlay");
        });

        game.mouse.registerClickable(this.researchButton);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.roundRect(-50, -50, Math.floor(this.width / 3 + 50), 180, 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (game.colony.research.active != null) {
            const research = game.colony.research.active;

            game.draw.textCenter(research.name, Math.floor(this.width / 6), 58, 14, "#FFFFFF");

            const barWidth = Math.floor(this.width / 3 - 20 - game.draw.textWidth("100%", 14));

            game.draw.text(`${Math.floor(research.progress * 100)}%`, 16 + barWidth, 80, 14, "#FFFFFF");

            //Overall progress bar
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(10, 80, barWidth * research.progress, 16);
            ctx.strokeRect(10, 80, barWidth, 16);

            //Invention
            if (research.needed.invention > 0) {
                ctx.fillStyle = '#1E90FF';
                ctx.fillRect(10, 96, barWidth * research.current.invention / research.needed.invention, 4);
                ctx.strokeRect(10, 96, barWidth, 4);
            }

            //Math
            if (research.needed.math > 0) {
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(10, 100, barWidth * research.current.math / research.needed.math, 4);
                ctx.strokeRect(10, 100, barWidth, 4);
            }

            //Physics
            if (research.needed.physics > 0) {
                ctx.fillStyle = '#48D1CC';
                ctx.fillRect(10, 104, barWidth * research.current.physics / research.needed.physics, 4);
                ctx.strokeRect(10, 104, barWidth, 4);
            }

            //Chemistry
            if (research.needed.chemistry > 0) {
                ctx.fillStyle = '#FF4500';
                ctx.fillRect(10, 108, barWidth * research.current.chemistry / research.needed.chemistry, 4);
                ctx.strokeRect(10, 108, barWidth, 4);
            }
            
            //Biology
            if (research.needed.biology > 0) {
                ctx.fillStyle = '#32CD32';
                ctx.fillRect(10, 112, barWidth * research.current.biology / research.needed.biology, 4);
                ctx.strokeRect(10, 112, barWidth, 4);
            }

            //Quantum
            if (research.needed.quantum > 0) {
                ctx.fillStyle = '#FF42EE';
                ctx.fillRect(10, 116, barWidth * research.current.quantum / research.needed.quantum, 4);
                ctx.strokeRect(10, 116, barWidth, 4);
            }
        } else {
            game.draw.textCenter(`Press '${game.key.actions.openResearch.bindings[0].key}' to select`, Math.floor(this.width / 6), 72, 14, "#FFFFFF");
            game.draw.textCenter("a new discovery", Math.floor(this.width / 6), 94, 14, "#FFFFFF");
        }

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("game");
    }

    public resize(width: number, height: number): void {
        this.researchButton.reposition(0, 50, Math.floor(width / 3), 80);
    }

}