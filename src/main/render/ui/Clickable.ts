import { ColonyCraft } from "../../ColonyCraft";

export abstract class Clickable {
    public abstract update (game: ColonyCraft, x: number, y: number, prevScreens: string[]): void;
    public abstract click (game: ColonyCraft, prevScreens: string[]): void;
    public abstract reposition(x: number, y: number, width: number, height: number): void;
}