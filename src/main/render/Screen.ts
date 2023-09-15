import { ColonyCraft } from "../ColonyCraft";
import { ScreenController } from "../controllers/ScreenController";

export abstract class Screen {
    protected width: number;
    protected height: number;
    protected x: number;
    protected y: number;

    constructor(width: number, height: number, x: number, y: number) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    public abstract render(game: typeof ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void;
    public abstract active(game: typeof ColonyCraft, renderer: ScreenController): boolean;
    public abstract resize(width: number, height: number): void;
}