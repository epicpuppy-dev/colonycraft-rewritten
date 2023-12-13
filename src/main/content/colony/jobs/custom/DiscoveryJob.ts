import { ColonyCraft } from "../../../../ColonyCraft";
import { ResearchTypes } from "../../research/ResearchManager";
import { Discoverer } from "../../research/Researcher";
import { Job } from "../Job";

export class DiscoveryJob extends Job implements Discoverer {
    readonly type: ResearchTypes;
    readonly researchAmount;

    constructor(game: ColonyCraft, id: string, name: string, priority: number, amount: number, type: ResearchTypes, unlocked: (game: ColonyCraft) => boolean, maxWorkers: (game: ColonyCraft) => number, desc?: string, cost?: {item: any, amount: number}) {
        super(game, id, name, priority, unlocked, maxWorkers, desc, cost);
        this.researchAmount = amount;
        this.type = type;

        game.colony.research.addResearcher(this);
    }

    research(game: ColonyCraft): number {
        return this.workersAssigned * this.researchAmount;
    }
}