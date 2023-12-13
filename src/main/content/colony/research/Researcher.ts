import { ColonyCraft } from "../../../ColonyCraft";
import { ResearchTypes } from "./ResearchManager";

export interface Discoverer {
    type: ResearchTypes;
    research (game: ColonyCraft): number;
}