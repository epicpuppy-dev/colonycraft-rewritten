import { ColonyCraft } from "../../../../ColonyCraft";
import { Builder } from "../../buildings/Builder";
import { Job } from "../Job";

export class BuilderJob extends Job implements Builder {
    private buildAmount: number;

    constructor(game: ColonyCraft, id: string, name: string, priority: number, builds: number, unlocked: (game: ColonyCraft) => boolean, maxWorkers: (game: ColonyCraft) => number, desc?: string, cost?: {item: any, amount: number}) {
        super(game, id, name, priority, unlocked, maxWorkers, desc, cost);
        this.buildAmount = builds;

        game.colony.buildings.addBuilder(this);
    }

    public build (game: ColonyCraft) {
        return this.workersAssigned * this.buildAmount;
    }
}