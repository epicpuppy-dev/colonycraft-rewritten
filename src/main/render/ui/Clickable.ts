import { ColonyCraft } from "../../ColonyCraft";

export abstract class Clickable {
    public abstract update (game: typeof ColonyCraft, x: number, y: number): void;
    public abstract click (game: typeof ColonyCraft): void;
    public abstract reposition(x: number, y: number, width: number, height: number): void;
}