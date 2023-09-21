import { SpriteRenderer } from "./SpriteRenderer";
import { TextRenderer } from "./TextRenderer";

export class RenderUtil {
    private font: TextRenderer;
    private fontSmall: TextRenderer;
    private sprites: SpriteRenderer;

    constructor(font: TextRenderer, fontSmall: TextRenderer, sprites: SpriteRenderer) {
        this.font = font;
        this.fontSmall = fontSmall;
        this.sprites = sprites;
    }

    text(text: string, x: number, y: number, size: number = 14, color: string = "#ffffff"): void {
        this.font.draw(text, x, y, size, color);
    }

    textSmall(text: string, x: number, y: number, size: number = 7, color: string = "#ffffff"): void {
        this.fontSmall.draw(text, x, y, size, color);
    }

    textCenter(text: string, x: number, y: number, size: number = 14, color: string = "#ffffff"): void {
        this.font.drawCenter(text, x, y, size, color);
    }

    textSmallCenter(text: string, x: number, y: number, size: number = 7, color: string = "#ffffff"): void {
        this.fontSmall.drawCenter(text, x, y, size, color);
    }

    textWidth(text: string, size: number = 14): number {
        return this.font.getWidth(text, size);
    }

    textSmallWidth(text: string, size: number = 7): number {
        return this.fontSmall.getWidth(text, size);
    }

    renderText(ctx: OffscreenCanvasRenderingContext2D): void {
        this.font.renderAll(ctx);
        this.fontSmall.renderAll(ctx);
    }

    sprite(ctx: OffscreenCanvasRenderingContext2D, name: string, x: number, y: number, width: number, height: number): void {
        this.sprites.renderSprite(name, ctx, x, y, width, height);
    }
}