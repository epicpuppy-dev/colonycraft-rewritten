import { Inventory } from "../content/colony/inventory/Inventory";
import { LootManager } from "../content/loot/LootManager";
import { LootTable } from "../content/loot/LootTable";

export class LootData {
    public static addLoot (manager: LootManager, inventory: Inventory) {
        const inv = inventory.items;
        manager.addLoot(new LootTable("forager", 1, [
            {weight: 4, item: inv.sticks, amount: 1},
            {weight: 2, item: inv.rocks, amount: 1},
            {weight: 4, item: inv.leaves, amount: 1},
        ]));
    }
}