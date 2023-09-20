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

    text(ctx: OffscreenCanvasRenderingContext2D, text: string, x: number, y: number, size: number = 14, color: string = "#ffffff"): void {
        this.font.render(ctx, text, x, y, size, color);
    }

    textSmall(ctx: OffscreenCanvasRenderingContext2D, text: string, x: number, y: number, size: number = 7, color: string = "#ffffff"): void {
        this.fontSmall.render(ctx, text, x, y, size, color);
    }

    textCenter(ctx: OffscreenCanvasRenderingContext2D, text: string, x: number, y: number, size: number = 14, color: string = "#ffffff"): void {
        this.font.renderCenter(ctx, text, x, y, size, color);
    }

    textSmallCenter(ctx: OffscreenCanvasRenderingContext2D, text: string, x: number, y: number, size: number = 7, color: string = "#ffffff"): void {
        this.fontSmall.renderCenter(ctx, text, x, y, size, color);
    }

    sprite(ctx: OffscreenCanvasRenderingContext2D, name: string, x: number, y: number, width: number, height: number): void {
        this.sprites.renderSprite(name, ctx, x, y, width, height);
    }

    textWidth(text: string, size: number = 14): number {
        return this.font.getWidth(text, size);
    }

    textSmallWidth(text: string, size: number = 7): number {
        return this.fontSmall.getWidth(text, size);
    }
}