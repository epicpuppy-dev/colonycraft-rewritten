import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class PanelBuildings extends Screen {
    private buildingButton: Button;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.buildingButton = new Button(0, 294, Math.floor(width / 3), 70, (game: ColonyCraft) => {
            game.currentScreens.push("buildings", "overlay");
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("game") && !game.currentScreens.includes("overlay") && game.colony.research.technologies.build1.unlocked;
        });

        game.mouse.registerClickable(this.buildingButton);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        if (!game.colony.research.technologies.build1.unlocked) return;

        ctx.beginPath();
        ctx.roundRect(-50, 294, Math.floor(this.width / 3 + 50), 70, 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();

        const buildings = game.colony.buildings;

        game.draw.textCenter(`${game.draw.toShortNumber(buildings.queueSize)} building${buildings.queueSize != 1 ? "s" : ""} in construction`, Math.floor(this.width / 6), 308, 14, "white");

        if (buildings.queueSize > 0) {
            game.draw.textCenter(`${game.draw.toShortNumber(buildings.workLeft)} work effort left`, Math.floor(this.width / 6), 334, 14, "white");
        } else {
            game.draw.textCenter(`Press 'B' to open the build menu`, Math.floor(this.width / 6), 334, 14, "white");
        }

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("game");
    }

    public resize(width: number, height: number): void {
        this.buildingButton.reposition(0, 50, Math.floor(width / 3), 80);
    }

}