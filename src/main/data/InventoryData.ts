import { Inventory } from "../content/colony/inventory/Inventory";
import { Item } from "../content/colony/inventory/Item";
import { ItemGroup } from "../content/colony/inventory/ItemGroup";
import { FluidItem } from "../content/colony/inventory/items/FluidItem";
import { FoodItem } from "../content/colony/inventory/items/FoodItem";

export class InventoryData {
    public static addItems (inventory: Inventory) {
        //Volume is space per 1,000 units
        inventory.addCategoryWithItems(new ItemGroup("food", "Food"), [
            new FoodItem("berries", 0.2, "Berries", 0.05, 0.4, 0.1, 0.15, 5),
            new FoodItem("herbs", 0.1, "Wild Herbs", 0.05, 0.2, 0.2, -0.2, 3),
        ]);
        inventory.addCategoryWithItems(new ItemGroup("fluids", "Fluids"), [
            new FluidItem("freshWater", 0.5, "Fresh Water", 0.05, 0.5, 0.5, 0.25, 10),
            new FluidItem("muddyWater", 0.5, "Muddy Water", 0.1, 0.5, -4, -1, 2),
        ]);
        inventory.addCategoryWithItems(new ItemGroup("primitive", "Primitive Materials"), [
            new Item("sticks", 1, "Sticks", 0.01), //TODO: Balance
            new Item("rocks", 2, "Rocks", 0.005), //TODO: Balance
            new Item("leaves", 0.4, "Leaves", 0.02) //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("lumber", "Lumber"), [
            new Item("logs", 4, "Logs", 0.01), //TODO: Balance
            new Item("planks", 1, "Planks", 0.0075), //TODO: Balance
            new Item("beams", 0.5, "Beams", 0.0075), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("mining", "Mining"), [
            new Item("stone", 5, "Stone", 0.0025), //TODO: Balance
            new Item("coal", 5, "Coal", 0.0025), //TODO: Balance
            new Item("ironOre", 5, "Magnetite Ore", 0.0025), //TODO: Balance
            new Item("tinOre", 5, "Cassiterite Ore", 0.0025), //TODO: Balance
            new Item("copperOre", 5, "Chalcopyrite Ore", 0.0025), //TODO: Balance
            new Item("zincOre", 5, "Sphalerite Ore", 0.0025), //TODO: Balance
            new Item("goldOre", 8, "Gold Ore", 0.0025), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("building", "Building Materials"), [
            new Item("Stone Bricks", 2, "Stone Bricks", 0.002), //TODO: Balance
            
        ]);
        inventory.addCategoryWithItems(new ItemGroup("metallurgy", "Metallurgy"), [
            new Item("iron", 2, "Iron", 0.002), //TODO: Balance
            new Item("tin", 2, "Tin", 0.002), //TODO: Balance
            new Item("copper", 2, "Copper", 0.002), //TODO: Balance
            new Item("zinc", 2, "Zinc", 0.002), //TODO: Balance
            new Item("bronze", 2, "Bronze", 0.002), //TODO: Balance
            new Item("steel", 2, "Steel", 0.002), //TODO: Balance
            new Item("silicon", 2, "Silicon", 0.002), //TODO: Balance
            new Item("gold", 2, "Gold", 0.002), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("industrial", "Industrial Materials"), [
            new Item("metalBeam", 1, "Metal Beams", 0.002), //TODO: Balance
            new Item("machineParts", 2, "Machine Parts", 0.002), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("electronics", "Electronics"), [
            //TODO: Electronics
        ]);
        inventory.addCategoryWithItems(new ItemGroup("test", "Test"), [
            new Item("test1", 0.1, "Test 1", 0),
            new Item("test2", 0.1, "Test 2", 0),
            new Item("test3", 0.1, "Test 3", 0),
            new Item("test4", 0.1, "Test 4", 0),
            new Item("test5", 0.1, "Test 5", 0),
            new Item("test6", 0.1, "Test 6", 0),
            new Item("test7", 0.1, "Test 7", 0),
            new Item("test8", 0.1, "Test 8", 0),
            new Item("test9", 0.1, "Test 9", 0),
            new Item("test10", 0.1, "Test 10", 0),
            new Item("test11", 0.1, "Test 11", 0),
            new Item("test12", 0.1, "Test 12", 0),
            new Item("test13", 0.1, "Test 13", 0),
            new Item("test14", 0.1, "Test 14", 0),
            new Item("test15", 0.1, "Test 15", 0),
        ])
    }
}