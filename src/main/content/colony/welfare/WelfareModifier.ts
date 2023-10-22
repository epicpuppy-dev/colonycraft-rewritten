import { ColonyCraft } from "../../../ColonyCraft";

export interface WelfareModifier {
    getMorale (game: ColonyCraft): number; // 1 unit = 0.1% per tick
    getHealth (game: ColonyCraft): number; // 1 unit = 0.1% per tick
}