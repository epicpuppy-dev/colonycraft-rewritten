export class Sprite {
    private image: HTMLImageElement;
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public render(ctx: OffscreenCanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        const setting = ctx.imageSmoothingEnabled;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height, x, y, width, height);
        ctx.imageSmoothingEnabled = setting;
    }
}