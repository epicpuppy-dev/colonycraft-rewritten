import { ColonyCraft } from "../../ColonyCraft";
import { Slidable } from "./Slidable";

export class Slider {
    protected min: number;
    protected max: number;
    public value: number;
    protected initialValue: number;
    protected barColor: string;
    protected sliderColor: string;
    protected hoverColor: string;
    protected heldColor: string;
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    protected type: "h" | "v";
    protected barSize: number;
    protected slidable: Slidable;

    constructor(game: ColonyCraft, x: number, y: number, width: number, height: number, type: "h" | "v", min: number, max: number, active: (game: ColonyCraft, x: number, y: number) => boolean = () => true, displaySize: number, barColor: string = "#333333", sliderColor: string = "#777777", hoverColor: string = "#999999", heldColor: string = "#bbbbbb") {
        this.min = min;
        this.max = max;
        this.value = this.min;
        this.initialValue = this.value;
        this.barColor = barColor;
        this.sliderColor = sliderColor;
        this.hoverColor = hoverColor;
        this.heldColor = heldColor;
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
        ctx.fillStyle = this.barColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.slidable.held ? this.heldColor : this.slidable.hover ? this.hoverColor : this.sliderColor;
        if (this.type == "h") {
            ctx.fillRect(Math.round(this.x + (this.width - this.barSize) * (this.value - this.min) / (this.max - this.min)), this.y, Math.round(this.barSize), this.height);
        } else {
            ctx.fillRect(this.x, Math.round(this.y + (this.height - this.barSize) * (this.value - this.min) / (this.max - this.min)), this.width, Math.round(this.barSize));
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
        this.value = Math.min(Math.max(value, this.min), this.max);
        let slidableWidth;
        let slidableHeight;
        if (this.type == "h") {
            this.barSize = Math.min(displaySize / ((max + displaySize) - min), 1) * this.width;
            slidableWidth = Math.round(this.barSize);
            slidableHeight = this.height;
            this.slidable.reposition(Math.round(this.x + (this.width - this.barSize) * (this.value - this.min) / (this.max - this.min)), this.y, slidableWidth, slidableHeight);
        } else {
            this.barSize = Math.min(displaySize / ((max + displaySize) - min), 1) * this.height;
            slidableWidth = this.width;
            slidableHeight = Math.round(this.barSize);
            this.slidable.reposition(this.x, Math.round(this.y + (this.height - this.barSize) * (this.value - this.min) / (this.max - this.min)), slidableWidth, slidableHeight);
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