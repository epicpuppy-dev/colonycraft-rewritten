import { ColonyCraft } from "../../ColonyCraft";
import { Scrollable } from "./Scrollable";
import { Slider } from "./Slider";

export class ScrollBar extends Slider {
    private scroll: Scrollable;

    constructor(game: ColonyCraft, x: number, y: number, width: number, height: number, type: "h" | "v", min: number, max: number, displaySize: number, ppu: number, active: (game: ColonyCraft, x: number, y: number) => boolean, barColor?: string, sliderColor?: string, hoverColor?: string, heldColor?: string) {
        super(game, x, y, width, height, type, min, max, active, displaySize, barColor, sliderColor, hoverColor, heldColor);
        this.scroll = new Scrollable(min, max, ppu, type, active, () => {
            this.value = this.scroll.value;
        });

        game.mouse.registerScrollable(this.scroll);
    }

    public setBounds(value: number, displaySize: number, max?: number, min?: number): void {
        super.setBounds(value, displaySize, max, min);
        this.scroll.resize(min, max, this.scroll.ppu);
        this.scroll.setValue(value);
    }

    public setValue(value: number): void {
        super.setValue(value);
        this.scroll.setValue(value);
    }
}