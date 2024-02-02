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
        //KEY: O = Obtainable, S = Sprited, B = Balanced
        inventory.addCategoryWithItems(new ItemGroup("food", "Food"), [
            new FoodItem(game, "berries", 0.2, "Berries", 0.05, 0.4, 0.25, 1, 5), //OS
            new FoodItem(game, "herbs", 0.1, "Wild Herbs", 0.04, 0.25, 0.5, -2, 4), //OS
            new FoodItem(game, "bread", 0.2, "Bread", 0.04, 1, 0.5, 0.5, 10), //OS
            new FoodItem(game, "cookedFish", 0.25, "Cooked Fish", 0.04, 0.5, 2, 3, 10), //OS
            new FoodItem(game, "cookedMeat", 0.25, "Cooked Meat", 0.04, 0.5, 2, 3, 10), //OS
            new FoodItem(game, "fish", 0.25, "Raw Fish", 0.08, 0.5, 0, 0.5, 3), //OS
            new FoodItem(game, "meat", 0.25, "Raw Meat", 0.08, 0.5, 0, 0, 3), //OS
        ]);
        inventory.addCategoryWithItems(new ItemGroup("liquids", "Water"), [
            new FluidItem(game, "freshWater", 0.5, "Fresh Water", 0.05, 0.5, 0, 0.5, 10), //OS
            new FluidItem(game, "muddyWater", 0.5, "Muddy Water", 0.1, 0.5, -12, -8, 2), //OS
        ]);
        inventory.addCategoryWithItems(new ItemGroup("tools", "Tools"), [
            new Item(game, "tool1", 1, "Primitive Tool", 0.005), //OS
            new Item(game, "tool2", 1, "Basic Tool", 0.004), //OS
            new Item(game, "tool3", 1, "Basic Metal Tool", 0.003), //OS
            new Item(game, "basket1", 10, "Basic Basket", 0.004), //OS
            new Item(game, "bucket1", 10, "Wooden Bucket", 0.004), //OS
        ]);
        inventory.addCategoryWithItems(new ItemGroup("amenities", "Amenities"), [
            new WelfareItem(game, "campfire", 20, "Campfire", 0.1, 10, 1.5, 1.5, "passive"), //OS
            new WelfareItem(game, "clothing1", 1, "Primitive Clothing", 0.02, 1, 1, 1, "passive"), //OS
        ]);
        inventory.addCategoryWithItems(new ItemGroup("primitive", "Primitive Materials"), [
            new Item(game, "sticks", 1, "Sticks", 0.01), //OS
            new Item(game, "rocks", 2, "Rocks", 0.005), //OS
            new Item(game, "leaves", 0.5, "Leaves", 0.02), //OS
            new Item(game, "fiber", 0.5, "Plant Fiber", 0.01), //OS
            new Item(game, "hide", 0.5, "Animal Hide", 0.01), //OS
            new Item(game, "clay", 4, "Clay", 0.01), //OS
            //new Item(game, "mud", 4, "Mud", 0.01),
        ]);
        inventory.addCategoryWithItems(new ItemGroup("basic", "Basic Materials"), [
            new Item(game, "composite", 2, "Unfired Brick", 0.005), //OS
            new Item(game, "twine", 0.1, "Plant Twine", 0.005), //OS
            new Item(game, "cloth", 0.1, "Cloth", 0.005), //OS
        ]);
        inventory.addCategoryWithItems(new ItemGroup("lumber", "Lumber"), [
            new Item(game, "logs", 4, "Logs", 0.01), //OS
            new Item(game, "planks", 1, "Planks", 0.0075), //OS
            new Item(game, "beams", 0.5, "Beams", 0.0075), //
        ]);
        inventory.addCategoryWithItems(new ItemGroup("agriculture", "Agriculture"), [
            new Item(game, "wheat", 1, "Wheat", 0.005), //OS
            new Item(game, "flour", 1, "Flour", 0.0025), //OS
            new FoodItem(game, "potato", 1, "Potato", 0.01, 0.25, 0.4, 0.3, 5), //OS
        ]);
        inventory.addCategoryWithItems(new ItemGroup("mining", "Mining"), [
            new Item(game, "stone", 5, "Stone", 0.0025), //OS
            new Item(game, "coal", 5, "Coal", 0.0025), //OS
            new Item(game, "copperOre", 5, "Chalcopyrite Ore", 0.0025), //OS
            new Item(game, "tinOre", 5, "Cassiterite Ore", 0.0025), //OS
            new Item(game, "ironOre", 5, "Magnetite Ore", 0.0025), //S
            new Item(game, "zincOre", 5, "Sphalerite Ore", 0.0025), //S
            new Item(game, "siliconOre", 5, "Silicon Ore", 0.0025), //S
            new Item(game, "goldOre", 8, "Gold Ore", 0.0025), //S
        ]);
        inventory.addCategoryWithItems(new ItemGroup("building", "Building Materials"), [
            new Item(game, "stoneBricks", 2, "Stone Bricks", 0.002), //
            new Item(game, "bricks", 2, "Bricks", 0.002), //OS
        ]);
        inventory.addCategoryWithItems(new ItemGroup("metallurgy", "Metallurgy"), [
            new Item(game, "copper", 2, "Copper", 0.002), //OS
            new Item(game, "tin", 2, "Tin", 0.002), //OS
            new Item(game, "iron", 2, "Iron", 0.002), //S
            new Item(game, "zinc", 2, "Zinc", 0.002), //S
            new Item(game, "bronze", 2, "Bronze", 0.002), //OS
            new Item(game, "steel", 2, "Steel", 0.002), //S
            new Item(game, "silicon", 2, "Silicon", 0.002), //
            new Item(game, "gold", 2, "Gold", 0.002), //S
        ]);
        inventory.addCategoryWithItems(new ItemGroup("industrial", "Industrial Materials"), [
            new Item(game, "metalBeam", 1, "Metal Beams", 0.002), //
            new Item(game, "machineParts", 2, "Machine Parts", 0.002), //
        ]);
        inventory.addCategoryWithItems(new ItemGroup("electronics", "Electronics"), [
            
        ]);
    }
}