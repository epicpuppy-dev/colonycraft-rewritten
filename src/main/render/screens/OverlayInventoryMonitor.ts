import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";

export class OverlayInventoryMonitor extends Screen {
    constructor(width: number, height: number) {
        super(width, height, 0, 0);
    }

    public render(game: typeof ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.fillStyle = 'red';
        ctx.fillRect(100, 100, 100, 100);
        game.draw.textSmall(ctx, "yahaha", 200, 100, 7, "blue");
        game.draw.sprite(ctx, "pause", 100, 300, 48, 48);
    }

    public active(game: typeof ColonyCraft): boolean {
        return game.currentScreens.includes("game");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

}