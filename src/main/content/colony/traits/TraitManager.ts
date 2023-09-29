import { ColonyCraft } from "../../../ColonyCraft";
import { Trait } from "./Trait";
import { TraitUpdate } from "./TraitUpdate";

export class TraitManager {
    public traits: {[key: string]: Trait} = {};
    public active: {s: Trait | null, c: Trait | null, p: Trait | null, r: Trait | null} = {s: null, c: null, p: null, r: null};
    private update: TraitUpdate;
    
    constructor (game: ColonyCraft) {
        this.update = new TraitUpdate(game);
    }

    public registerTrait(trait: Trait) {
        this.traits[trait.id] = trait;
    }
}