import { game } from "../../index";
import { ColonyCraft } from "../ColonyCraft";
import { Screen } from "../render/Screen";
import { ScreenLayer } from "../render/ScreenLayer";

export class ScreenController {
    private screens: Screen[];
    private ctx: OffscreenCanvasRenderingContext2D;
    private layers: ScreenLayer[];
    public canvas: OffscreenCanvas;

    constructor (game: ColonyCraft) {
        this.screens = [];
        this.layers = [];
        this.canvas = new OffscreenCanvas(game.width, game.height);
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
        this.canvas.width = game.width;
        this.canvas.height = game.height;
        //resize each layer
        for (const layer of this.layers) {
            layer.resize(this.canvas.width, this.canvas.height);
        }
    }

    public render (game: ColonyCraft) {
        this.layers.sort((a, b) => a.z - b.z);
        for (const layer of this.layers) {
            layer.render(game);
            this.ctx.drawImage(layer.canvas, 0, 0);
        }
    }

    public clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}