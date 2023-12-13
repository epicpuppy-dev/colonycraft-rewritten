import { ColonyCraft } from "../../../ColonyCraft";
import { TraitTypes } from "./TraitManager";

export interface Developer {
    type: TraitTypes;
    develop (game: ColonyCraft): number;
}