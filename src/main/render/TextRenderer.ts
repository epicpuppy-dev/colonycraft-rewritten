import { game } from "../..";
import { ColonyCraft } from "../ColonyCraft";
import { FontEntry } from "../data/FontEntry";

export class TextRenderer {
    private canvas: OffscreenCanvas;
    private ctx: OffscreenCanvasRenderingContext2D;
    private fontData: {[key: string]: FontEntry};
    private fontImg: HTMLImageElement;
    private size: number;
    private height: number;
    private padding: number;

    public constructor (game: ColonyCraft, data: {[key: string]: FontEntry}, img: string, size: number, height: number, padding: number) {
        this.canvas = new OffscreenCanvas(game.width, game.height);
        this.ctx = this.canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
        this.ctx.imageSmoothingEnabled = false;
        this.fontData = data;
        this.fontImg = new Image();
        this.fontImg.src = img;
        this.size = size;
        this.height = height;
        this.padding = padding;
    }

    public resize () {
        this.canvas.width = game.width;
        this.canvas.height = game.height;
    }

    public draw (text: string, x: number, y: number, size: number, color: string) {
        let xOffset = 0;
        let scale = size / this.size;
        for (const char of text) {
            const entry = this.fontData[char];
            if (entry) {
                this.ctx.drawImage(this.fontImg, entry.x, entry.y, entry.width - this.padding, this.height, Math.round(x + xOffset), y, Math.round((entry.width - this.padding) * scale), Math.round(this.height * scale));
                xOffset += entry.width * scale;
            }
        }
        this.ctx.globalCompositeOperation = 'source-atop';
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, xOffset, this.height * scale);
        this.ctx.globalCompositeOperation = 'source-over';
    }

    public drawCenter (text: string, x: number, y: number, size: number, color: string) {
        const textWidth = this.getWidth(text, size);
        this.draw(text, Math.floor(x - textWidth / 2), y, size, color);
    }

    public renderAll (ctx: OffscreenCanvasRenderingContext2D) {
        ctx.drawImage(this.canvas, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public getWidth (text: string, size: number): number {
        let width = 0;
        let scale = size / this.size;
        for (const char of text) {
            const entry = this.fontData[char];
            if (entry) {
                width += entry.width * scale;
            }
        }
        return width;
    }
}