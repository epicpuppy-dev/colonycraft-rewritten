import { Inventory } from "../features/colony/inventory/Inventory";
import { Item } from "../features/colony/inventory/Item";
import { ItemGroup } from "../features/colony/inventory/ItemGroup";

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
            new Item("sticks", 1, "Sticks"), //TODO: Balance
            new Item("rocks", 2, "Rocks"), //TODO: Balance
            new Item("leaves", 0.4, "Leaves") //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("lumber", "Lumber"), [
            new Item("logs", 4, "Logs"), //TODO: Balance
            new Item("planks", 1, "Planks"), //TODO: Balance
            new Item("beams", 0.5, "Beams"), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("mining", "Mining"), [
            new Item("stone", 5, "Stone"), //TODO: Balance
            new Item("coal", 5, "Coal"), //TODO: Balance
            new Item("ironOre", 5, "Magnetite Ore"), //TODO: Balance
            new Item("tinOre", 5, "Casserite Ore"), //TODO: Balance
            new Item("copperOre", 5, "Chalcopyrite Ore"), //TODO: Balance
            new Item("zincOre", 5, "Sphalerite Ore"), //TODO: Balance
            new Item("goldOre", 8, "Gold Ore"), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("building", "Building Materials"), [
            new Item("Stone Bricks", 2, "Stone Bricks"), //TODO: Balance
            
        ]);
        inventory.addCategoryWithItems(new ItemGroup("metallurgy", "Metallurgy"), [
            new Item("iron", 2, "Iron"), //TODO: Balance
            new Item("tin", 2, "Tin"), //TODO: Balance
            new Item("copper", 2, "Copper"), //TODO: Balance
            new Item("zinc", 2, "Zinc"), //TODO: Balance
            new Item("bronze", 2, "Bronze"), //TODO: Balance
            new Item("steel", 2, "Steel"), //TODO: Balance
            new Item("silicon", 2, "Silicon"), //TODO: Balance
            new Item("gold", 2, "Gold"), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("industrial", "Industrial Materials"), [
            new Item("metalBeam", 1, "Metal Beams"), //TODO: Balance
            new Item("machineParts", 2, "Machine Parts"), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("electronics", "Electronics"), [
            //TODO: Electronics
        ]);
    }
}