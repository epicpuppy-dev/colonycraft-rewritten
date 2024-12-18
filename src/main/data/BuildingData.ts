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
        const buildings = game.colony.buildings.buildings;

        manager.addBuilding(new StorageBuilding(game, "storage1", "Storage Pit", 1, 10, 0, 5, ["+5 storage capacity"], [{item: items.sticks, amount: 15}, {item: items.rocks, amount: 5}, {item: items.leaves, amount: 25}], () => techs.storage1.unlocked));
        manager.addBuilding(new StorageBuilding(game, "storage2", "Storage Hut", 2, 250, 0, 25, ["+50 storage capacity"], [{item: items.planks, amount: 25}, {item: items.rocks, amount: 20}, {item: items.twine, amount: 100}], () => techs.storage2.unlocked));

        manager.addBuilding(new Building(game, "wheat1", "Wheat Patch", 5, 250, 0, ["Allows the growing of wheat"], [{item: items.tool1, amount: 10}, {item: items.fiber, amount: 50}], () => techs.wheat1.unlocked));
        manager.addBuilding(new Building(game, "potato1", "Potato Patch", 5, 250, 0, ["Allows the growing of potatoes"], [{item: items.tool1, amount: 10}, {item: items.fiber, amount: 50}], () => techs.potato1.unlocked));

        manager.addBuilding(new Building(game, "kiln1", "Basic Kiln", 1, 100, 0, ["Allows the firing of bricks"], [{item: items.composite, amount: 24}, {item: items.campfire, amount: 2}], () => techs.kiln1.unlocked));
        manager.addBuilding(new Building(game, "bakery1", "Basic Oven", 1, 100, 0, ["Allows the baking of bread"], [{item: items.composite, amount: 24}, {item: items.campfire, amount: 2}], () => techs.bakery1.unlocked));

        manager.addBuilding(new Building(game, "well1", "Water Well", 1, 100, 0, ["Allows the pumping of water"], [{item: items.bricks, amount: 16}, {item: items.tool2, amount: 6}, {item: items.bucket1, amount: 3}], () => techs.water2.unlocked));

        manager.addBuilding(new Building(game, "copper1", "Copper Furnace", 2, 500, 0, ["Allows the smelting of copper"], [{item: items.bricks, amount: 24}, {item: items.logs, amount: 8}], () => techs.copper1.unlocked));
        manager.addBuilding(new Building(game, "tin1", "Tin Furnace", 2, 500, 0, ["Allows the smelting of tin"], [{item: items.bricks, amount: 24}, {item: items.logs, amount: 8}], () => techs.tin1.unlocked));
        manager.addBuilding(new Building(game, "bronze1", "Bronze Crucible", 4, 1250, 0, ["Allows the alloying of bronze"], [{item: items.bricks, amount: 96}, {item: items.coal, amount: 36}, {item: items.tool3, amount: 24}], () => techs.bronze1.unlocked));

        manager.addBuilding(new Building(game, "monument1", "Bronze Monument", 10, 5000, 1, ["To commemorate our achievements", "Can only be built once", "", "The end of ColonyCraft v0.1"], [{item: items.planks, amount: 500}, {item: items.bricks, amount: 500}, {item: items.bronze, amount: 250}, {item: items.tool3, amount: 100}], () => techs.monument1.unlocked, game => Math.min(Math.floor((game.colony.buildings.landMax - game.colony.buildings.landPending) / buildings.monument1.area + buildings.monument1.target), 1)));
    }
}