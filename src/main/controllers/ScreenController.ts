import { ColonyCraft } from "../ColonyCraft";
import { Screen } from "../render/Screen";
import { ScreenLayer } from "../render/ScreenLayer";

export class ScreenController {
    private screens: Screen[];
    private ctx: OffscreenCanvasRenderingContext2D;
    private layers: ScreenLayer[];
    public canvas: OffscreenCanvas;
    public current: string[];

    constructor () {
        this.screens = [];
        this.layers = [];
        this.current = [];
        this.canvas = new OffscreenCanvas(ColonyCraft.width, ColonyCraft.height);
        this.ctx = this.canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
    }

    public addScreen (layer: ScreenLayer, screen: Screen) {
        layer.addScreen(screen);
        this.screens.push(screen);
    }

    public addLayer (layer: ScreenLayer) {
        this.layers.push(layer);
    }

    public addLayerWithScreens (layer: ScreenLayer, screens: Screen[]) {
        for (const screen of screens) {
            this.addScreen(layer, screen);
        }
        this.layers.push(layer);
    }

    public resize () {
        this.canvas.width = ColonyCraft.width;
        this.canvas.height = ColonyCraft.height;
        //resize each layer
        for (const layer of this.layers) {
            layer.resize(this.canvas.width, this.canvas.height);
        }
    }

    public render () {
        this.layers.sort((a, b) => a.z - b.z);
        for (const layer of this.layers) {
            layer.render(ColonyCraft, this);
            this.ctx.drawImage(layer.canvas, 0, 0);
        }
    }

    public clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}