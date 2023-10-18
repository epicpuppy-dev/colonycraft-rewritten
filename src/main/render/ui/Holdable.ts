import { ColonyCraft } from "../../ColonyCraft";

export abstract class Holdable {
    public held: boolean = false;
    public hover: boolean = false;
    public abstract update (game: ColonyCraft, x: number, y: number): void;
    public abstract mousedown (game: ColonyCraft, x: number, y: number): void;
    public abstract mouseup (game: ColonyCraft, x: number, y: number): void;
    public abstract mousetick (game: ColonyCraft, x: number, y: number): void;
    public abstract reposition(x: number, y: number, width: number, height: number): void;
}