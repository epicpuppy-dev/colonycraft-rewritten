import { ColonyCraft } from "../../ColonyCraft";
import { ScreenController } from "../../controllers/ScreenController";
import { Screen } from "../Screen";

export class ScreenPerformance extends Screen {
    constructor(width: number, height: number) {
        super(width, height, 0, 0);
    }

    public render(game: typeof ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        game.draw.textSmall(ctx, `FPS: ${game.clock.getFPS().toFixed(0)}`, 6, 6, 7, "white");
        game.draw.textSmall(ctx, `TPS: ${game.clock.getTPS().toFixed(2)}`, 6, 16, 7, "white");
    }

    public active(game: typeof ColonyCraft, renderer: ScreenController): boolean {
        return true;
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}