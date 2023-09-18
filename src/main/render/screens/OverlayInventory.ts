import { ColonyCraft } from "../../ColonyCraft";
import { ScreenController } from "../../controllers/ScreenController";
import { Screen } from "../Screen";

export class OverlayInventory extends Screen {
    constructor(width: number, height: number) {
        super(width, height, 0, 0);
    }

    public render(game: typeof ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        
    }

    public active(game: typeof ColonyCraft): boolean {
        return game.currentScreens.includes("inventory");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}