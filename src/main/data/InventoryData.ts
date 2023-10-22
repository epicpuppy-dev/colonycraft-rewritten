import { ColonyCraft } from "../ColonyCraft";
import { Inventory } from "../content/colony/inventory/Inventory";
import { Item } from "../content/colony/inventory/Item";
import { ItemGroup } from "../content/colony/inventory/ItemGroup";
import { FluidItem } from "../content/colony/inventory/items/FluidItem";
import { FoodItem } from "../content/colony/inventory/items/FoodItem";
import { WelfareItem } from "../content/colony/inventory/items/WelfareItem";

export class InventoryData {
    public static addItems (game: ColonyCraft, inventory: Inventory) {
        //Volume is space per 1,000 units
        inventory.addCategoryWithItems(new ItemGroup("food", "Food"), [
            new FoodItem(game, "berries", 0.2, "Berries", 0.05, 0.4, 0.25, 1, 5),
            new FoodItem(game, "herbs", 0.1, "Wild Herbs", 0.05, 0.25, 0.5, -2, 3),
        ]);
        inventory.addCategoryWithItems(new ItemGroup("fluids", "Fluids"), [
            new FluidItem(game, "freshWater", 0.5, "Fresh Water", 0.05, 0.5, 0, 0.5, 10),
            new FluidItem(game, "muddyWater", 0.5, "Muddy Water", 0.1, 0.5, -12, -8, 2),
        ]);
        inventory.addCategoryWithItems(new ItemGroup("tools", "Tools"), [
            new Item(game, "tool1", 1, "Primitive Tool", 0.005),
            new Item(game, "tool2", 1, "Basic Tool", 0.004),
        ]);
        inventory.addCategoryWithItems(new ItemGroup("primitive", "Primitive Materials"), [
            new Item(game, "sticks", 1, "Sticks", 0.01), //TODO: Balance
            new Item(game, "rocks", 2, "Rocks", 0.005), //TODO: Balance
            new Item(game, "leaves", 0.5, "Leaves", 0.02), //TODO: Balance
            new Item(game, "fibre", 0.5, "Plant Fibre", 0.01), //TODO: Balance
            new Item(game, "clay", 4, "Clay", 0.01), //TODO: Balance
            new Item(game, "mud", 4, "Mud", 0.01), //TODO: Balance
        ]);
        inventory.addCategoryWithItems(new ItemGroup("basic", "Basic Materials"), [
            new Item(game, "composite", 4, "Brick Composite", 0.01), //TODO: Balance
            new WelfareItem(game, "campfire", 20, "Campfire", 0.1, 10, 5, 5, "passive"),
            new Item(game, "twine", 0.1, "Plant Twine", 0.005), //TODO: Balance
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
            new Item(game, "stoneBricks", 2, "Stone Bricks", 0.002), //TODO: Balance
            new Item(game, "bricks", 2, "Bricks", 0.002), //TODO: Balance
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
    }
}