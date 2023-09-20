import { Sprite } from "../data/Sprite";
import { SpriteSheet } from "../data/SpriteSheet";

export class SpriteRenderer {
    private sheets: {[key: string]: SpriteSheet};
    private sprites: {[key: string]: Sprite};

    public renderSprite(name: string, ctx: OffscreenCanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        if (this.sprites[name]) this.sprites[name].render(ctx, x, y, width, height);
        else this.sprites.temp.render(ctx, x, y, width, height);
    }

    public addSprite(name: string, sheet: SpriteSheet, x: number, y: number, width: number, height: number): void {
        sheet.addSprite(name, x, y, width, height);
        this.sprites[name] = sheet.getSprite(name);
    }

    public addSheet(name: string, src: string): void {
        this.sheets[name] = new SpriteSheet(src);
    }

    public addSheetWithSprites(name: string, src: string, sprites: {[key: string]: [number, number, number, number]}): void {
        this.sheets[name] = new SpriteSheet(src);
        for (const sprite in sprites) {
            this.addSprite(sprite, this.sheets[name], sprites[sprite][0], sprites[sprite][1], sprites[sprite][2], sprites[sprite][3]);
        }
    }

    public getLoaded(name: string): boolean {
        return this.sheets[name].getLoaded();
    }

    constructor() {
        this.sheets = {};
        this.sprites = {};
    }
}