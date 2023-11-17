import { ColonyCraft } from "../../ColonyCraft";

export class Scrollable {
    public ppu: number;
    public value: number;
    private min: number;
    private max: number;
    private scroll: number;
    private type: "h" | "v" | "b";
    public active: (game: ColonyCraft, x: number, y: number, prevScreens: string[]) => boolean;
    public onTick: (game: ColonyCraft, deltaX: number, deltaY: number, prevScreens: string[]) => void;

    constructor (min: number, max: number, ppu: number, type: "h" | "v", active: (game: ColonyCraft, x: number, y: number, prevScreens: string[]) => boolean = () => true, onTick: (game: ColonyCraft, deltaX: number, deltaY: number, prevScreens: string[]) => void = () => {}) {
        this.min = min;
        this.max = max;
        this.ppu = ppu;
        this.value = min;
        this.scroll = 0;
        this.type = type;
        this.active = active;
        this.onTick = onTick;
    }

    public tick (game: ColonyCraft, x: number, y: number, deltaX: number, deltaY: number, prevScreens: string[]) {
        if (!this.active(game, x, y, prevScreens)) return;
        if (this.type == "h") {
            this.scroll = Math.min(Math.max(this.min * this.ppu, this.scroll + deltaX), this.max * this.ppu);
            this.value = Math.round(this.scroll / this.ppu);
        } else if (this.type == "v") {
            this.scroll = Math.min(Math.max(this.min * this.ppu, this.scroll + deltaY), this.max * this.ppu);
            this.value = Math.round(this.scroll / this.ppu);
        }
        this.onTick(game, deltaX, deltaY, prevScreens);
    }

    public resize (min: number = this.min, max: number = this.max, ppu: number = this.ppu) {
        this.min = min;
        this.max = max;
        this.value = Math.min(Math.max(this.min, this.value), this.max);
        this.ppu = ppu;
    }

    public setValue (value: number) {
        if (this.value == value) return;
        this.value = Math.min(Math.max(this.min, value), this.max);;
        this.scroll = value * this.ppu;
    }
}