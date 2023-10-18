import { Inventory } from "../content/colony/inventory/Inventory";
import { LootManager } from "../content/loot/LootManager";
import { LootTable } from "../content/loot/LootTable";

export class LootData {
    public static addLoot (manager: LootManager, inventory: Inventory) {
        const inv = inventory.items;
        manager.addLoot(new LootTable("forager", 1, [
            {weight: 16, item: inv.sticks, amount: 1},
            {weight: 10, item: inv.rocks, amount: 1},
            {weight: 20, item: inv.leaves, amount: 1},
            {weight: 26, item: inv.berries, amount: 3},
            //{weight: 20, item: inv.herbs, amount: 2},
            {weight: 1, item: inv.freshWater, amount: 1},
            {weight: 4, item: inv.muddyWater, amount: 2},
        ]));
    }
}