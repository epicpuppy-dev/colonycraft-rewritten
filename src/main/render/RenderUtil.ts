import { ColonyCraft } from "../ColonyCraft";
import { KeyAction } from "../player/KeyAction";
import { KeyBind } from "../player/KeyBind";
import { SpriteRenderer } from "./SpriteRenderer";
import { TextRenderer } from "./TextRenderer";

export class RenderUtil {
    readonly font: TextRenderer;
    readonly fontSmall: TextRenderer;
    readonly sprites: SpriteRenderer;
    public closeButton: KeyBind;

    constructor(game: ColonyCraft, font: TextRenderer, fontSmall: TextRenderer, sprites: SpriteRenderer) {
        this.font = font;
        this.fontSmall = fontSmall;
        this.sprites = sprites;
        this.closeButton = new KeyBind("Close Menu", "Esc", "Escape", []);
        game.key.addBinding(this.closeButton);
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

    renderText(ctx: OffscreenCanvasRenderingContext2D, alpha?: number): void {
        this.font.renderAll(ctx, alpha);
        this.fontSmall.renderAll(ctx, alpha);
    }

    sprite(ctx: OffscreenCanvasRenderingContext2D, name: string, x: number, y: number, width: number, height: number): void {
        this.sprites.renderSprite(name, ctx, x, y, width, height);
    }

    toShortNumber(num: number): string {
        if (num < 1 && Math.floor(num) != num) return num.toFixed(2);
        if (num < 1000 && Math.floor(num) != num) return num.toPrecision(3);
        if (num < 1000) return num.toString();
        if (num < 1000000) return (num / 1000).toPrecision(3) + "k";
        if (num < 1000000000) return (num / 1000000).toPrecision(3) + "m";
        if (num < 1000000000000) return (num / 1000000000).toPrecision(3) + "b";
        if (num < 1000000000000000) return (num / 1000000000000).toPrecision(3) + "t";
        else return (num / 1000000000000000).toPrecision(3) + "q";
    }

    addCloseAction(action: KeyAction) {
        this.closeButton.actions.push(action);
        action.bindings.push(this.closeButton);
    }
}