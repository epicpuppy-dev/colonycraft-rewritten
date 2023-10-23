import { ColonyCraft } from "../ColonyCraft";
import { Building } from "../content/colony/buildings/Building";
import { BuildingManager } from "../content/colony/buildings/BuildingManager";
import { CraftingBuilding } from "../content/colony/buildings/custom/CraftingBuilding";
import { StorageBuilding } from "../content/colony/buildings/custom/StorageBuilding";

export class BuildingData {
    public static addBuildings (game: ColonyCraft, manager: BuildingManager) {
        const items = game.colony.inventory.items;
        const recipes = game.colony.recipes.recipes;
        const tables = game.loot.loot;
        const techs = game.colony.research.technologies;

        manager.addBuilding(new StorageBuilding(game, "storage1", "Storage Pit", 1, 5, 0, 5, ["+5 storage capacity"], [{item: items.sticks, amount: 15}, {item: items.rocks, amount: 5}, {item: items.leaves, amount: 25}], () => techs.storage1.unlocked));
        manager.addBuilding(new StorageBuilding(game, "storage2", "Storage Hut", 2, 100, 0, 25, ["+50 storage capacity"], [{item: items.planks, amount: 25}, {item: items.rocks, amount: 20}, {item: items.twine, amount: 100}], () => techs.storage2.unlocked, () => Infinity));

        manager.addBuilding(new Building(game, "kiln1", "Basic Kiln", 1, 10, 0, ["Allows the firing of bricks"], [{item: items.composite, amount: 24}, {item: items.campfire, amount: 2}], () => techs.kiln1.unlocked));

        manager.addBuilding(new Building(game, "test8", "Test 8", 1, 99, 100, ["it works."], [], () => techs.test8.unlocked));
    }
}