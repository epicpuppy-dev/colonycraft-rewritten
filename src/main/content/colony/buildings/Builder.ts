import { ColonyCraft } from "../../../ColonyCraft";

export interface Builder {
    build (game: ColonyCraft): number;
}