import { ColonyCraft } from '../ColonyCraft';
import { Screen } from './Screen';

export class ScreenLayer {
    private screens: Screen[];
    private canvas: OffscreenCanvas;
    private ctx: OffscreenCanvasRenderingContext2D;
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

    public render (game: ColonyCraft) {
        for (const screen of this.screens) {
            if (screen.active(game)) {
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