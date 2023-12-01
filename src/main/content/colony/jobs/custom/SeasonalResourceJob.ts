import { ColonyCraft } from "../../../../ColonyCraft";
import { LootTable } from "../../../loot/LootTable";
import { ResourceJob } from "./ResourceJob";

export class SeasonalResourceJob extends ResourceJob {
    public seasons: [number, number, number, number];

    constructor(game: ColonyCraft, id: string, name: string, priority: number, rolls: [number, number, number, number], table: LootTable, unlocked: (game: ColonyCraft) => boolean, maxWorkers: (game: ColonyCraft) => number, desc?: string, cost?: {item: any, amount: number}) {
        super(game, id, name, priority, rolls[0], table, unlocked, maxWorkers, desc, cost);
        this.seasons = rolls;
    }

    public tick (game: ColonyCraft) {
        this.rolls = this.seasons[game.clock.season - 1];
        super.tick(game);
    }
}