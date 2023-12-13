import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { Trait } from "./Trait";
import { Developer } from "./Developer";
import { TraitUpdate } from "./TraitUpdate";

export class TraitManager implements Saveable {
    public traits: {[key: string]: Trait} = {};
    public active: {s: Trait | null, c: Trait | null, p: Trait | null, r: Trait | null} = {s: null, c: null, p: null, r: null};
    public developers: Developer[] = [];
    private update: TraitUpdate;
    
    constructor (game: ColonyCraft) {
        this.update = new TraitUpdate(game);

        game.save.register(this, "trait");
    }

    public registerTrait(trait: Trait) {
        this.traits[trait.id] = trait;
    }

    public save (): string {
        if (this.active.s == null && this.active.c == null && this.active.p == null && this.active.r == null) return "";
        return `${this.active.s != null ? this.active.s.id : ""}-${this.active.c != null ? this.active.c.id : ""}-${this.active.p != null ? this.active.p.id : ""}-${this.active.r != null ? this.active.r.id : ""}`;
    }

    public load (data: string) {
        let split = data.split("-");
        if (split[0].length > 0 && this.traits[split[0]]) this.active.s = this.traits[split[0]];
        if (split[1].length > 0 && this.traits[split[1]]) this.active.c = this.traits[split[1]];
        if (split[2].length > 0 && this.traits[split[2]]) this.active.p = this.traits[split[2]];
        if (split[3].length > 0 && this.traits[split[3]]) this.active.r = this.traits[split[3]];
    }

    public newGame() {
        this.active = {s: null, c: null, p: null, r: null};
    }

    public addDeveloper (developer: Developer) {
        this.developers.push(developer);
    }
}

export type TraitTypes = "s" | "c" | "p" | "r";