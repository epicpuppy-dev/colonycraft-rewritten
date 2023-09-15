import { ColonyCraft } from '../ColonyCraft';
import { ScreenController } from '../controllers/ScreenController';
import { Screen } from './Screen';

export class ScreenLayer {
    private screens: Screen[];
    private ctx: OffscreenCanvasRenderingContext2D;
    public readonly canvas: OffscreenCanvas;
    public z: number;

    constructor (z: number) {
        this.screens = [];
        this.canvas = new OffscreenCanvas(ColonyCraft.width, ColonyCraft.height);
        this.ctx = this.canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
        this.z = z;
    }

    public addScreen (screen: Screen) {
        this.screens.push(screen);
    }

    public render (game: typeof ColonyCraft, renderer: ScreenController) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const screen of this.screens) {
            if (screen.active(game, renderer)) {
                screen.render(game, this.ctx);
            }
        }
    }

    public resize (width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        for (const screen of this.screens) {
            screen.resize(width, height);
        }
    }
}