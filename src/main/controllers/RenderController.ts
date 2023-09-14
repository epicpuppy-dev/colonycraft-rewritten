import { ColonyCraft } from "../ColonyCraft";

export class RenderController {
    public canvas: OffscreenCanvas;
    public ctx: OffscreenCanvasRenderingContext2D;

    constructor () {
        this.canvas = new OffscreenCanvas(ColonyCraft.width, ColonyCraft.height);
        this.ctx = this.canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
    }

    public clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public render () {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //draw a square in the center
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(Math.round(this.canvas.width / 2 - 50), Math.round(this.canvas.height / 2 - 50), 100, 100);
    }

    public resize () {
        this.canvas.width = ColonyCraft.width;
        this.canvas.height = ColonyCraft.height;
    }
}