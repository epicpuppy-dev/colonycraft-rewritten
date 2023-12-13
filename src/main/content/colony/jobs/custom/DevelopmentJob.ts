import { ColonyCraft } from "../../../../ColonyCraft";
import { Developer } from "../../traits/Developer";
import { TraitTypes } from "../../traits/TraitManager";
import { Job } from "../Job";

export class DevelopmentJob extends Job implements Developer {
    readonly type: TraitTypes;
    readonly developAmount;

    constructor(game: ColonyCraft, id: string, name: string, priority: number, amount: number, type: TraitTypes, unlocked: (game: ColonyCraft) => boolean, maxWorkers: (game: ColonyCraft) => number, desc?: string, cost?: {item: any, amount: number}) {
        super(game, id, name, priority, unlocked, maxWorkers, desc, cost);
        this.developAmount = amount;
        this.type = type;

        game.colony.traits.addDeveloper(this);
    }

    develop(game: ColonyCraft): number {
        return this.workersAssigned * this.developAmount;
    }
}