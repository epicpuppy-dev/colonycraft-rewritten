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
        manager.addBuilding(new Building(game, "test2", "Test 2", 2, 10, 1));
        manager.addBuilding(new Building(game, "test3", "Test 3", 3, 15, 2));
        manager.addBuilding(new Building(game, "test4", "Test 4", 4, 20, 3));
        manager.addBuilding(new Building(game, "test5", "Test 5", 5, 25, 4));
        manager.addBuilding(new Building(game, "test6", "Test 6", 6, 30, 5));
        manager.addBuilding(new Building(game, "test7", "Test 7", 7, 35, 6));
        manager.addBuilding(new Building(game, "test8", "Test 8", 8, 40, 7));
        manager.addBuilding(new Building(game, "test9", "Test 9", 9, 45, 8));
        manager.addBuilding(new Building(game, "test10", "Test 10", 10, 50, 9));
        manager.addBuilding(new CraftingBuilding(game, "testcraft", "Crafter", 1, 10, -1, recipes.test, 5, ["Crafts logs from sticks and rocks"], [{item: items.sticks, amount: 15}, {item: items.rocks, amount: 15}]));
        manager.addBuilding(new Building(game, "test11", "Test 11", 11, 55, 10));
        manager.addBuilding(new Building(game, "test12", "Test 12", 12, 60, 11));
        manager.addBuilding(new Building(game, "test13", "Test 13", 13, 65, 12));
        manager.addBuilding(new Building(game, "test14", "Test 14", 14, 70, 13));
        manager.addBuilding(new Building(game, "test15", "Test 15", 15, 75, 14));
        manager.addBuilding(new Building(game, "test16", "Test 16", 16, 80, 15));
        manager.addBuilding(new Building(game, "test17", "Test 17", 17, 85, 16));
        manager.addBuilding(new Building(game, "test18", "Test 18", 18, 90, 17));
        manager.addBuilding(new Building(game, "test19", "Test 19", 19, 95, 18));
        manager.addBuilding(new Building(game, "test20", "Test 20", 20, 100, 19));
        manager.addBuilding(new Building(game, "test21", "Test 21", 21, 105, 20));
        manager.addBuilding(new Building(game, "test22", "Test 22", 22, 110, 21));
        manager.addBuilding(new Building(game, "test23", "Test 23", 23, 115, 22));
        manager.addBuilding(new Building(game, "test24", "Test 24", 24, 120, 23));
        manager.addBuilding(new Building(game, "test25", "Test 25", 25, 125, 24));
        manager.addBuilding(new Building(game, "test26", "Test 26", 26, 130, 25));
        manager.addBuilding(new Building(game, "test27", "Test 27", 27, 135, 26));
        manager.addBuilding(new Building(game, "test28", "Test 28", 28, 140, 27));
        manager.addBuilding(new Building(game, "test29", "Test 29", 29, 145, 28));
        manager.addBuilding(new Building(game, "test30", "Test 30", 30, 150, 29));
    }
}