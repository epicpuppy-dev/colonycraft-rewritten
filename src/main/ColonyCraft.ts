import { RenderController } from "./controllers/RenderController";

export class ColonyCraft {
    public static width: number;
    public static height: number;
    private static canvas: HTMLCanvasElement;
    private static ctx: CanvasRenderingContext2D;
    private static renderer: RenderController;

    public static main () {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.appendChild(this.canvas);
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.renderer = new RenderController();
    }

    public static tick() {

    }

    public static render() {
        //clear current screen
        this.renderer.clear();

        //render new screen
        this.renderer.render();

        //draw to canvas
        this.ctx.drawImage(this.renderer.canvas, 0, 0);
    }

    public static resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.renderer.resize();
    }
}