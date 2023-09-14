import { ClockController } from "./controllers/ClockController";
import { RenderController } from "./controllers/RenderController";
import { FontData } from "./data/FontData";
import { TextRenderer } from "./render/TextRenderer";
import fontImage from "./resources/ui/font.png";
import fontImageSmall from "./resources/ui/fontsmall.png";

export class ColonyCraft {
    public static width: number;
    public static height: number;
    public static clock: ClockController;
    public static font: TextRenderer;
    public static fontSmall: TextRenderer;

    private static canvas: HTMLCanvasElement;
    private static ctx: CanvasRenderingContext2D;
    private static renderer: RenderController;

    public static main () {
        //Set width and height
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        //Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.appendChild(this.canvas);
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        //Initialize Renderers
        this.renderer = new RenderController();
        this.font = new TextRenderer(FontData.normal, fontImage, 14, 18, 2);
        this.fontSmall = new TextRenderer(FontData.small, fontImageSmall, 7, 9, 1);

        //Create clock controller and start frame and tick
        this.clock = new ClockController(60, 1);
        this.clock.startFrame();
        this.clock.startTick();
    }

    public static tick() {

    }

    public static render() {
        //clear current screen
        this.renderer.clear();

        //render new screen
        this.renderer.render();

        //render fps and tps
        this.fontSmall.render(this.renderer.ctx, `FPS: ${this.clock.getFPS().toFixed(1)}`, 4, 4, 7, 'white');
        this.fontSmall.render(this.renderer.ctx, `TPS: ${this.clock.getTPS().toFixed(2)}`, 4, 14, 7, 'white');

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