import { Sprite } from "./Sprite";

export class SpriteSheet {
    private image: HTMLImageElement;
    private sprites: {[key: string]: Sprite};

    constructor(src: string) {
        this.image = new Image();
        this.image.src = src;
        this.sprites = {};
    }

    public renderSprite(name: string, ctx: OffscreenCanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        this.sprites[name].render(ctx, x, y, width, height);
    }

    public addSprite(name: string, x: number, y: number, width: number, height: number): void {
        this.sprites[name] = new Sprite(this.image, x, y, width, height);
    }

    public getSprite(name: string): Sprite {
        return this.sprites[name];
    }

    public getLoaded(): boolean {
        return this.image.complete;
    }
}