import { ColonyCraft } from "../../ColonyCraft";
import { Tooltip } from "./Tooltip";

export class TooltipRenderer {
    private hoverTime: number = 0;
    private prevX: number = 0;
    private prevY: number = 0;
    private tooltips: { [key: string]: Tooltip } = {};

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        if (game.mouse.x != this.prevX || game.mouse.y != this.prevY) {
            this.hoverTime = 0;
        }
        this.prevX = game.mouse.x;
        this.prevY = game.mouse.y;
        this.hoverTime = this.hoverTime + game.clock.getFrameTime(game) / 1000;
        let tooltip: Tooltip | null = null;
        let render: boolean = false;
        for (let key in this.tooltips) {
            tooltip = this.tooltips[key];
            if (
                game.mouse.x > tooltip.hitbox.x &&
                game.mouse.x < tooltip.hitbox.x + tooltip.hitbox.width &&
                game.mouse.y > tooltip.hitbox.y &&
                game.mouse.y < tooltip.hitbox.y + tooltip.hitbox.height &&
                tooltip.hoverTime <= this.hoverTime &&
                tooltip.active(game)
            ) {
                render = true;
                break;
            }
        }
        if (!render || tooltip == null) return;
        //get tooltip width and height
        let lines = tooltip.lines;
        if (typeof lines === "function") {
            lines = lines(game);
        }
        let textRaw = tooltip.title.text;
        let titleText;
        if (typeof textRaw === "function") {
            titleText = textRaw(game);
        } else {
            titleText = textRaw;
        }
        let maxwidth = game.draw.textWidth(titleText, 14);
        let texts: string[] = [];
        for (let i = 0; i < lines.length; i++) {
            textRaw = lines[i].text;
            let text;
            if (typeof textRaw === "function") {
                text = textRaw(game);
            } else {
                text = textRaw;
            }
            let width = game.draw.textSmallWidth(text, 7);
            if (width > maxwidth) {
                maxwidth = width;
            }
            texts.push(text);
        }
        let width = maxwidth + tooltip.style.padding * 2;

        let height = tooltip.style.padding * 2 + 14;
        for (let i = 0; i < lines.length; i++) {
            if (texts[i] == "") continue;
            if (i == 0) {
                height += tooltip.style.titleLineSpacing;
            } else {
                height += tooltip.style.lineSpacing;
            }
            height += 7;
        }
        let offsetX = 0;
        let offsetY = 0;
        if (game.mouse.x + width + 12 > game.width) {
            offsetX = game.mouse.x + 13 + width - game.width;
        }
        if (game.mouse.y + height + 12 > game.height) {
            offsetY = game.mouse.y + 13 + height - game.height;
        }
        let renderX = game.mouse.x + 12 - offsetX;
        let renderY = game.mouse.y + 12 - offsetY;
        ctx.fillStyle = tooltip.style.background;
        ctx.strokeStyle = tooltip.style.border;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(renderX, renderY, width, height, tooltip.style.borderRadius);
        ctx.fill();
        ctx.stroke();

        game.draw.text(titleText, renderX + tooltip.style.padding, renderY + tooltip.style.padding, 14, tooltip.title.color);
        let currentY = renderY + tooltip.style.padding + tooltip.style.titleLineSpacing + 14;
        for (let i = 0; i < lines.length; i++) {
            if (texts[i] == "") continue;
            game.draw.textSmall(texts[i], renderX + tooltip.style.padding, currentY, 7, lines[i].color);
            currentY += tooltip.style.lineSpacing + 7;
        }

        game.draw.renderText(ctx);
    }

    public addTooltip(tooltip: Tooltip): void {
        this.tooltips[tooltip.id] = tooltip;
    }
}