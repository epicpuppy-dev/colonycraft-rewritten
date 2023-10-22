import { Inventory } from "../content/colony/inventory/Inventory";
import { LootManager } from "../content/loot/LootManager";
import { LootTable } from "../content/loot/LootTable";

export class LootData {
    public static addLoot (manager: LootManager, inventory: Inventory) {
        const items = inventory.items;
        manager.addLoot(new LootTable("forager", 1, [
            {weight: 26, item: items.sticks, amount: 1},
            {weight: 18, item: items.rocks, amount: 1},
            {weight: 15, item: items.leaves, amount: 2},
            {weight: 24, item: items.berries, amount: 2},
            {weight: 18, item: items.herbs, amount: 2},
            {weight: 24, item: items.fibre, amount: 2},
            {weight: 1, item: items.freshWater, amount: 1},
            {weight: 6, item: items.muddyWater, amount: 2},
        ]));

        manager.addLoot(new LootTable("woodcutter", 1, [
            {weight: 4, item: items.logs, amount: 2},
            {weight: 2, item: items.sticks, amount: 5},
            {weight: 3, item: items.leaves, amount: 8}
        ]));

        manager.addLoot(new LootTable("digger", 1, [
            {weight: 1, item: items.clay, amount: 1},
            {weight: 1, item: items.mud, amount: 1},
            {weight: 2, item: null, amount: 0}
        ]));

        manager.addLoot(new LootTable("campfire", 1, [
            {weight: 3, item: items.campfire, amount: 1},
            {weight: 1, item: null, amount: 0}
        ]));
    }
}