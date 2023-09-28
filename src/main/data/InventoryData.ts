import { Inventory } from "../content/colony/inventory/Inventory";
import { Item } from "../content/colony/inventory/Item";
import { ItemGroup } from "../content/colony/inventory/ItemGroup";

export class InventoryData {
    public static addItems (inventory: Inventory) {
        //Volume is space per 1,000 units
        inventory.addCategoryWithItems(new ItemGroup("food", "Food"), [
            //TODO: FoodItem
        ]);
        inventory.addCategoryWithItems(new ItemGroup("fluids", "Fluids"), [
            //TODO: FluidItem
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
    }
}