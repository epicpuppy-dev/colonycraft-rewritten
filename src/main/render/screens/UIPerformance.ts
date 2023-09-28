import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";

export class UIPerformance extends Screen {
    constructor(width: number, height: number) {
        super(width, height, 0, 0);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        game.draw.textSmall(`FPS: ${game.clock.getFPS(game).toFixed(0)}`, 6, 6, 7, "white");
        game.draw.textSmall(`TPS: ${game.clock.getTPS(game).toFixed(2)}`, 6, 16, 7, "white");
        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return true;
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}