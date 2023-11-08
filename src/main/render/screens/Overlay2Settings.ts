import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";

export class Overlay2Settings extends Screen {
    constructor (game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
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
        game.draw.textCenter("Settings", Math.floor(this.width / 2), Math.floor(this.height / 8 + 8), 28, "white");
        ctx.fillRect(Math.floor(this.width / 4 + 20), Math.floor(this.height / 8 + 42), Math.floor(this.width / 2 - 40), 2);

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("settings");
    }
}