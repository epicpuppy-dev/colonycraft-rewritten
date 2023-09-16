import { ColonyCraft } from "../../ColonyCraft";
import { ScreenController } from "../../controllers/ScreenController";
import { Screen } from "../Screen";

export class ScreenTitle extends Screen {
    constructor(width: number, height: number) {
        super(width, height, 0, 0);
    }

    public render(game: typeof ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        game.draw.textCenter(ctx, "ColonyCraft", Math.floor(this.width / 2), Math.floor(this.height / 2 - 100), 42, "white");
        game.draw.sprite(ctx, "play", Math.floor(this.width / 2 - 24), Math.floor(this.height / 2 + 25), 48, 48);
    }

    public active(game: typeof ColonyCraft, renderer: ScreenController): boolean {
        return renderer.current.includes("title");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}