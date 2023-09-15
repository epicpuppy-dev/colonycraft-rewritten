import { ColonyCraft } from "../../ColonyCraft";
import { ScreenController } from "../../controllers/ScreenController";
import { Screen } from "../Screen";

export class ScreenTitle extends Screen {
    constructor(width: number, height: number) {
        super(width, height, 0, 0);
    }

    public render(game: typeof ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        game.font.renderCenter(ctx, "ColonyCraft", this.width / 2, this.height / 2 - 50, 42, "white");
    }

    public active(game: typeof ColonyCraft, renderer: ScreenController): boolean {
        return renderer.current.includes("title");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}