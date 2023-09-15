import { ColonyCraft } from "../ColonyCraft";

export abstract class Screen {
    public readonly width: number;
    public readonly height: number;
    public readonly x: number;
    public readonly y: number;

    constructor(width: number, height: number, x: number, y: number) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    public abstract render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void;
    public abstract active(game: ColonyCraft): boolean;
    public abstract resize(width: number, height: number): void;
}