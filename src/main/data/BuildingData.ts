import { ColonyCraft } from "../ColonyCraft";
import { Building } from "../content/colony/buildings/Building";
import { BuildingManager } from "../content/colony/buildings/BuildingManager";

export class BuildingData {
    public static addBuildings (game: ColonyCraft, manager: BuildingManager) {
        manager.addBuilding(new Building("test", "Test", 1, 5, 0));
        manager.addBuilding(new Building("test2", "Test2", 2, 10, 1));
        manager.addBuilding(new Building("test3", "Test3", 3, 15, 2));
        manager.addBuilding(new Building("test4", "Test4", 4, 20, 3));
        manager.addBuilding(new Building("test5", "Test5", 5, 25, 4));
        manager.addBuilding(new Building("test6", "Test6", 6, 30, 5));
        manager.addBuilding(new Building("test7", "Test7", 7, 35, 6));
        manager.addBuilding(new Building("test8", "Test8", 8, 40, 7));
        manager.addBuilding(new Building("test9", "Test9", 9, 45, 8));
        manager.addBuilding(new Building("test10", "Test10", 10, 50, 9));
    }
}