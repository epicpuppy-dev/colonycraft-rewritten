import { ColonyCraft } from "../ColonyCraft";
import { Building } from "../content/colony/buildings/Building";
import { BuildingManager } from "../content/colony/buildings/BuildingManager";
import { CraftingBuilding } from "../content/colony/buildings/custom/CraftingBuilding";

export class BuildingData {
    public static addBuildings (game: ColonyCraft, manager: BuildingManager) {
        const items = game.colony.inventory.items;
        const recipes = game.colony.recipes.recipes;
        const tables = game.loot.loot;

        manager.addBuilding(new Building(game, "test", "Test", 1, 5, 0, ["test", "test2"], [{item: items.sticks, amount: 15}, {item: items.rocks, amount: 5}]));
        manager.addBuilding(new Building(game, "test2", "Test2", 2, 10, 1));
        manager.addBuilding(new Building(game, "test3", "Test3", 3, 15, 2));
        manager.addBuilding(new Building(game, "test4", "Test4", 4, 20, 3));
        manager.addBuilding(new Building(game, "test5", "Test5", 5, 25, 4));
        manager.addBuilding(new Building(game, "test6", "Test6", 6, 30, 5));
        manager.addBuilding(new Building(game, "test7", "Test7", 7, 35, 6));
        manager.addBuilding(new Building(game, "test8", "Test8", 8, 40, 7));
        manager.addBuilding(new Building(game, "test9", "Test9", 9, 45, 8));
        manager.addBuilding(new Building(game, "test10", "Test10", 10, 50, 9));
        manager.addBuilding(new CraftingBuilding(game, "testcraft", "Crafter", 1, 10, -1, recipes.test, 5, ["Crafts logs from sticks and rocks"], [{item: items.sticks, amount: 15}, {item: items.rocks, amount: 15}]));
    }
}