import { ColonyCraft } from "../../ColonyCraft";
import { Slidable } from "./Slidable";

export class Slider {
    protected min: number;
    protected max: number;
    public value: number;
    protected initialValue: number;
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    protected type: "h" | "v";
    protected barSize: number;
    protected slidable: Slidable;
    protected colors: {
        bar: string,
        slider: string,
        hover: string,
        held: string
    }

    constructor(game: ColonyCraft, x: number, y: number, width: number, height: number, type: "h" | "v", min: number, max: number, active: (game: ColonyCraft, x: number, y: number, prevScreens: string[]) => boolean = () => true, displaySize: number, 
        colors: {bar: string, slider: string, hover: string, held: string} = {bar: "#333333", slider: "#777777", hover: "#999999", held: "#bbbbbb"}) {
        this.min = min;
        this.max = max;
        this.value = this.min;
        this.initialValue = this.value;
        this.colors = colors;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        let slidableWidth: number;
        let slidableHeight: number;
        if (this.type == "h") {
            this.barSize = Math.min(displaySize / ((max + displaySize) - min), 1) * this.width;
            slidableWidth = Math.round(this.barSize);
            slidableHeight = this.height;
        } else {
            this.barSize = Math.min(displaySize / ((max + displaySize) - min), 1) * this.height;
            slidableWidth = this.width;
            slidableHeight = Math.round(this.barSize);
        }
        this.slidable = new Slidable(x, y, slidableWidth, slidableHeight, active, () => {}, () => {
            this.initialValue = this.value;
        }, (game, x, y, offsetX, offsetY) => {
            if (this.max - this.min <= 0) return;
            if (this.type == "h") {
                this.setValue(Math.round(Math.min(Math.max(this.min, this.initialValue + (this.max - this.min) * offsetX / (this.width - this.barSize)), this.max)));
            } else {
                this.setValue(Math.round(Math.min(Math.max(this.min, this.initialValue + (this.max - this.min) * offsetY / (this.height - this.barSize)), this.max)));
            }
            this.slidable.reposition(Math.round(this.x + (this.width - this.barSize) * (this.value - this.min) / (this.max - this.min)), this.y, this.slidable.width, this.slidable.height);
        });

        game.mouse.registerHoldable(this.slidable);
    }

    public render(ctx: OffscreenCanvasRenderingContext2D) {
        ctx.fillStyle = this.colors.bar;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.slidable.held ? this.colors.held : this.slidable.hover ? this.colors.hover : this.colors.slider;
        let widthPortion = isFinite((this.value - this.min) / (this.max - this.min)) ? (this.value - this.min) / (this.max - this.min) : 1;
        if (this.type == "h") {
            ctx.fillRect(Math.round(this.x + (this.width - this.barSize) * widthPortion), this.y, Math.round(this.barSize), this.height);
        } else {
            ctx.fillRect(this.x, Math.round(this.y + (this.height - this.barSize) * widthPortion), this.width, Math.round(this.barSize));
        }
    }

    public reposition(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public setBounds(value: number, displaySize: number, max: number = this.max, min: number = this.min) {
        this.min = min;
        this.max = max;
        this.value = Math.max(Math.min(value, this.max), this.min);
        let slidableWidth;
        let slidableHeight;
        let widthPortion = isFinite((this.value - this.min) / (this.max - this.min)) ? (this.value - this.min) / (this.max - this.min) : 1;
        if (this.type == "h") {
            this.barSize = Math.min(displaySize / ((max + displaySize) - min), 1) * this.width;
            slidableWidth = Math.round(this.barSize);
            slidableHeight = this.height;
            this.slidable.reposition(Math.round(this.x + (this.width - this.barSize) * widthPortion), this.y, slidableWidth, slidableHeight);
        } else {
            this.barSize = Math.min(displaySize / ((max + displaySize) - min), 1) * this.height;
            slidableWidth = this.width;
            slidableHeight = Math.round(this.barSize);
            this.slidable.reposition(this.x, Math.round(this.y + (this.height - this.barSize) * widthPortion), slidableWidth, slidableHeight);
        }
    }

    public setValue(value: number) {
        this.value = Math.min(Math.max(value, this.min), this.max);
        if (this.type == "h") {
            this.slidable.reposition(Math.round(this.x + (this.width - this.barSize) * (this.value - this.min) / (this.max - this.min)), this.y, this.slidable.width, this.slidable.height);
        } else {
            this.slidable.reposition(this.x, Math.round(this.y + (this.height - this.barSize) * (this.value - this.min) / (this.max - this.min)), this.slidable.width, this.slidable.height);
        }
    }
}