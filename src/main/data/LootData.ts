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
            {weight: 20, item: items.fiber, amount: 2},
            {weight: 8, item: items.muddyWater, amount: 1},
        ]));

        manager.addLoot(new LootTable("gatherer", 1, [
            {weight: 14, item: items.sticks, amount: 1},
            {weight: 9, item: items.rocks, amount: 1},
            {weight: 8, item: items.leaves, amount: 2},
            {weight: 12, item: items.berries, amount: 2},
            {weight: 9, item: items.herbs, amount: 2},
            {weight: 10, item: items.fiber, amount: 2},
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

        manager.addLoot(new LootTable("water", 1, [
            {weight: 1, item: items.freshWater, amount: 1},
            {weight: 4, item: items.muddyWater, amount: 1},
        ]));

        manager.addLoot(new LootTable("campfire", 1, [
            {weight: 3, item: items.campfire, amount: 1},
            {weight: 1, item: null, amount: 0}
        ]));

        manager.addLoot(new LootTable("wheat", 1, [
            {weight: 3, item: items.wheat, amount: 1},
            {weight: 1, item: null, amount: 0}
        ]));

        manager.addLoot(new LootTable("potato", 1, [
            {weight: 3, item: items.potato, amount: 1},
            {weight: 1, item: null, amount: 0}
        ]));

        manager.addLoot(new LootTable("cookedFish", 1, [
            {weight: 3, item: items.cookedFish, amount: 1},
            {weight: 1, item: null, amount: 0}
        ]));

        manager.addLoot(new LootTable("fish", 1, [
            {weight: 2, item: items.fish, amount: 1},
            {weight: 1, item: null, amount: 0}
        ]));

        manager.addLoot(new LootTable("cookedMeat", 1, [
            {weight: 3, item: items.cookedMeat, amount: 1},
            {weight: 1, item: null, amount: 0}
        ]));

        manager.addLoot(new LootTable("hunter", 1, [
            {weight: 1, item: items.meat, amount: 3},
            {weight: 1, item: items.hide, amount: 1},
            {weight: 2, item: null, amount: 0}
        ]));

        manager.addLoot(new LootTable("copperOre1", 1, [
            {weight: 3, item: items.stone, amount: 1},
            {weight: 1, item: items.copperOre, amount: 1}
        ]));

        manager.addLoot(new LootTable("tinOre1", 1, [
            {weight: 3, item: items.stone, amount: 1},
            {weight: 1, item: items.tinOre, amount: 1}
        ]));

        manager.addLoot(new LootTable("coal1", 1, [
            {weight: 2, item: items.stone, amount: 1},
            {weight: 2, item: items.coal, amount: 1}
        ]));

        manager.addLoot(new LootTable("nothing", 1, [
            {weight: 1, item: null, amount: 0}
        ]));
    }
}