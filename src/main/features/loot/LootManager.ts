import { LootTable } from "./LootTable";

export class LootManager {
    public loot: { [key: string]: LootTable } = {};

    public addLoot (loot: LootTable) {
        this.loot[loot.id] = loot;
    }
}