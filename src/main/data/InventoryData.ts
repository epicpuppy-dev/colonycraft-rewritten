import { ColonyCraft } from "../ColonyCraft";
import { Inventory } from "../content/colony/inventory/Inventory";
import { Item } from "../content/colony/inventory/Item";
import { ItemGroup } from "../content/colony/inventory/ItemGroup";
import { FluidItem } from "../content/colony/inventory/items/FluidItem";
import { FoodItem } from "../content/colony/inventory/items/FoodItem";

export class InventoryData {
    public static addItems (game: ColonyCraft, inventory: Inventory) {
        //Volume is space per 1,000 units
        inventory.addCategoryWithItems(new ItemGroup("food", "Food"), [
            new FoodItem(game, "berries", 0.2, "Berries", 0.05, 0.4, 0.1, 0.5, 5),
            new FoodItem(game, "herbs", 0.1, "Wild Herbs", 0.05, 0.25, 0.2, -0.5, 3),
        ]);
        inventory.addCategoryWithItems(new ItemGroup("fluids", "Fluids"), [
            new FluidItem(game, "freshWater", 0.5, "Fresh Water", 0.05, 0.5, 0, 0.2, 10),
            new FluidItem(game, "muddyWater", 0.5, "Muddy Water", 0.1, 0.5, -10, -5, 2),
        ]);
        inventory.addCategoryWithItems(new ItemGroup("primitive", "Primitive Materials"), [
            new Item(game, "sticks", 1, "Sticks", 0.01), //TODO: Balance
            new Item(game, "rocks", 2, "Rocks", 0.005), //TODO: Balance
            new Item(game, "leaves", 0.4, "Leaves", 0.02) //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("lumber", "Lumber"), [
            new Item(game, "logs", 4, "Logs", 0.01), //TODO: Balance
            new Item(game, "planks", 1, "Planks", 0.0075), //TODO: Balance
            new Item(game, "beams", 0.5, "Beams", 0.0075), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("mining", "Mining"), [
            new Item(game, "stone", 5, "Stone", 0.0025), //TODO: Balance
            new Item(game, "coal", 5, "Coal", 0.0025), //TODO: Balance
            new Item(game, "ironOre", 5, "Magnetite Ore", 0.0025), //TODO: Balance
            new Item(game, "tinOre", 5, "Cassiterite Ore", 0.0025), //TODO: Balance
            new Item(game, "copperOre", 5, "Chalcopyrite Ore", 0.0025), //TODO: Balance
            new Item(game, "zincOre", 5, "Sphalerite Ore", 0.0025), //TODO: Balance
            new Item(game, "goldOre", 8, "Gold Ore", 0.0025), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("building", "Building Materials"), [
            new Item(game, "Stone Bricks", 2, "Stone Bricks", 0.002), //TODO: Balance
            
        ]);
        inventory.addCategoryWithItems(new ItemGroup("metallurgy", "Metallurgy"), [
            new Item(game, "iron", 2, "Iron", 0.002), //TODO: Balance
            new Item(game, "tin", 2, "Tin", 0.002), //TODO: Balance
            new Item(game, "copper", 2, "Copper", 0.002), //TODO: Balance
            new Item(game, "zinc", 2, "Zinc", 0.002), //TODO: Balance
            new Item(game, "bronze", 2, "Bronze", 0.002), //TODO: Balance
            new Item(game, "steel", 2, "Steel", 0.002), //TODO: Balance
            new Item(game, "silicon", 2, "Silicon", 0.002), //TODO: Balance
            new Item(game, "gold", 2, "Gold", 0.002), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("industrial", "Industrial Materials"), [
            new Item(game, "metalBeam", 1, "Metal Beams", 0.002), //TODO: Balance
            new Item(game, "machineParts", 2, "Machine Parts", 0.002), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("electronics", "Electronics"), [
            //TODO: Electronics
        ]);
        inventory.addCategoryWithItems(new ItemGroup("test", "Test"), [
            new Item(game, "test1", 0.1, "Test 1", 0),
            new Item(game, "test2", 0.1, "Test 2", 0),
            new Item(game, "test3", 0.1, "Test 3", 0),
            new Item(game, "test4", 0.1, "Test 4", 0),
            new Item(game, "test5", 0.1, "Test 5", 0),
            new Item(game, "test6", 0.1, "Test 6", 0),
            new Item(game, "test7", 0.1, "Test 7", 0),
            new Item(game, "test8", 0.1, "Test 8", 0),
            new Item(game, "test9", 0.1, "Test 9", 0),
            new Item(game, "test10", 0.1, "Test 10", 0),
            new Item(game, "test11", 0.1, "Test 11", 0),
            new Item(game, "test12", 0.1, "Test 12", 0),
            new Item(game, "test13", 0.1, "Test 13", 0),
            new Item(game, "test14", 0.1, "Test 14", 0),
            new Item(game, "test15", 0.1, "Test 15", 0),
        ])
    }
}