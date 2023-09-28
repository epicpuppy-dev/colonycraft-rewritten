import { ColonyCraft } from "../ColonyCraft";

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

    public abstract render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void;
    public abstract active(game: ColonyCraft): boolean;
}