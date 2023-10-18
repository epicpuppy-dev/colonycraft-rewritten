import { ColonyCraft } from "../../ColonyCraft";

export class Scrollable {
    public ppu: number;
    public value: number;
    private min: number;
    private max: number;
    private scroll: number;
    private type: "h" | "v";
    public active: (game: ColonyCraft, x: number, y: number) => boolean;
    public onTick: (game: ColonyCraft, deltaX: number, deltaY: number) => void;

    constructor (min: number, max: number, ppu: number, type: "h" | "v", active: (game: ColonyCraft, x: number, y: number) => boolean = () => true, onTick: (game: ColonyCraft, deltaX: number, deltaY: number) => void = () => {}) {
        this.min = min;
        this.max = max;
        this.ppu = ppu;
        this.value = min;
        this.scroll = 0;
        this.type = type;
        this.active = active;
        this.onTick = onTick;
    }

    public tick (game: ColonyCraft, x: number, y: number, deltaX: number, deltaY: number) {
        if (!this.active(game, x, y)) return;
        if (this.type == "h") {
            this.scroll = Math.min(Math.max(this.min * this.ppu, this.scroll + deltaX), this.max * this.ppu);
            this.value = Math.round(this.scroll / this.ppu + this.min);
        } else if (this.type == "v") {
            this.scroll = Math.min(Math.max(this.min * this.ppu, this.scroll + deltaY), this.max * this.ppu);
            this.value = Math.round(this.scroll / this.ppu + this.min);
        }
        this.onTick(game, deltaX, deltaY);
    }

    public resize (min: number = this.min, max: number = this.max, ppu: number = this.ppu) {
        this.min = min;
        this.max = max;
        this.value = Math.min(Math.max(this.min, this.value), this.max);
        this.ppu = ppu;
    }

    public setValue (value: number) {
        this.value = value;
        this.scroll = (value - this.min) * this.ppu;
    }
}