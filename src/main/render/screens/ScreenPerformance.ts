import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";

export class ScreenPerformance extends Screen {
    constructor(width: number, height: number) {
        super(width, height, 0, 0);
    }

    public render(game: typeof ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        game.draw.textSmall(`FPS: ${game.clock.getFPS().toFixed(0)}`, 6, 6, 7, "white");
        game.draw.textSmall(`TPS: ${game.clock.getTPS().toFixed(2)}`, 6, 16, 7, "white");
        game.draw.textSmall(`Babies: ${game.colony.population.babies}`, 6, 26, 7, "white");
        game.draw.textSmall(`Children: ${game.colony.population.children}`, 6, 36, 7, "white");
        game.draw.textSmall(`Adults: ${game.colony.population.adults}`, 6, 46, 7, "white");
        game.draw.textSmall(`Seniors: ${game.colony.population.seniors}`, 6, 56, 7, "white");
        game.draw.renderText(ctx);
    }

    public active(game: typeof ColonyCraft): boolean {
        return true;
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}