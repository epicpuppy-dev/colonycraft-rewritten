import { ColonyCraft } from "../../../../ColonyCraft";
import { LootTable } from "../../../loot/LootTable";
import { Job } from "../Job";

export class ResourceJob extends Job {
    readonly table: LootTable;
    public rolls: number;

    constructor(game: ColonyCraft, id: string, name: string, priority: number, rolls: number, table: LootTable, unlocked: (game: ColonyCraft) => boolean, maxWorkers: (game: ColonyCraft) => number, desc?: string, cost?: {item: any, amount: number}) {
        super(game, id, name, priority, unlocked, maxWorkers, desc, cost);
        this.rolls = rolls;
        this.table = table;
    }

    public tick (game: ColonyCraft) {
        const loot = this.table.roll(Math.round(this.rolls * this.workersAssigned * game.colony.welfare.workModifier));
        for (const item of loot) {
            if (item[0] !== null) {
                item[0].add(item[1]);
            }
        }
    }
}