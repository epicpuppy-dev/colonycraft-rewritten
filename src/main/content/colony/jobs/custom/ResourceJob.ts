import { ColonyCraft } from "../../../../ColonyCraft";
import { LootTable } from "../../../loot/LootTable";
import { Job } from "../Job";

export class ResourceJob extends Job {
    private table: LootTable;
    private rolls: number;

    constructor(game: ColonyCraft, id: string, name: string, priority: number, rolls: number, table: LootTable, unlocked: (game: ColonyCraft) => boolean, maxWorkers: (game: ColonyCraft) => number) {
        super(game, id, name, priority, unlocked, maxWorkers);
        this.rolls = rolls;
        this.table = table;
    }

    public tick (game: ColonyCraft) {
        const loot = this.table.roll(this.rolls * this.workersAssigned);
        for (const item of loot) {
            if (item[0] !== null) {
                item[0].amount += item[1];
            }
        }
    }
}