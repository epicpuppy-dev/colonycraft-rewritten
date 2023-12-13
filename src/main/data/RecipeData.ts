import { ColonyCraft } from "../ColonyCraft";
import { Recipe } from "../content/colony/crafting/Recipe";
import { RecipeManager } from "../content/colony/crafting/RecipeManager";

export class RecipeData {
    public static addRecipes (game: ColonyCraft, manager: RecipeManager) {
        const items = game.colony.inventory.items;
        const tables = game.loot.loot;

        // Lumber
        manager.addRecipe(new Recipe("planks1", [{item: items.logs, amount: 1}], [{item: items.planks, amount: 4}]));

        // Tools
        manager.addRecipe(new Recipe("tool1", [{item: items.rocks, amount: 2}], [{item: items.tool1, amount: 1}]));
        manager.addRecipe(new Recipe("tool2", [{item: items.tool1, amount: 2}, {item: items.twine, amount: 2}, {item: items.sticks, amount: 2}], [{item: items.tool2, amount: 1}]));
        manager.addRecipe(new Recipe("tool3c", [{item: items.tool2, amount: 2}, {item: items.copper, amount: 2}], [{item: items.tool3, amount: 1}]));
        manager.addRecipe(new Recipe("tool3t", [{item: items.tool2, amount: 2}, {item: items.tin, amount: 2}], [{item: items.tool3, amount: 1}]));
        manager.addRecipe(new Recipe("basket1", [{item: items.twine, amount: 4}, {item: items.cloth, amount: 1}], [{item: items.basket1, amount: 1}]));
        manager.addRecipe(new Recipe("bucket1", [{item: items.planks, amount: 2}], [{item: items.bucket1, amount: 1}]));

        // Food
        manager.addRecipe(new Recipe("flour1", [{item: items.wheat, amount: 2}], [{item: items.flour, amount: 2}]));
        manager.addRecipe(new Recipe("bread1", [{item: items.flour, amount: 2}, {item: items.freshWater, amount: 1}], [{item: items.bread, amount: 1}]));
        manager.addRecipe(new Recipe("cookedFish1", [{item: items.fish, amount: 1}], tables.cookedFish));
        manager.addRecipe(new Recipe("cookedMeat1", [{item: items.meat, amount: 1}], tables.cookedMeat));

        // Metallurgy
        manager.addRecipe(new Recipe("copper1", [{item: items.copperOre, amount: 2}], [{item: items.copper, amount: 1}]));
        manager.addRecipe(new Recipe("tin1", [{item: items.tinOre, amount: 2}], [{item: items.tin, amount: 1}]));
        manager.addRecipe(new Recipe("bronze1", [{item: items.copper, amount: 3}, {item: items.tin, amount: 1}], [{item: items.bronze, amount: 2}]));

        // Cultural
        manager.addRecipe(new Recipe("culture1", [{item: items.logs, amount: 1}], tables.nothing));

        // Other
        manager.addRecipe(new Recipe("twine1", [{item: items.fiber, amount: 3}], [{item: items.twine, amount: 1}]));
        manager.addRecipe(new Recipe("cloth1", [{item: items.fiber, amount: 8}], [{item: items.cloth, amount: 1}]));
        manager.addRecipe(new Recipe("clothing1", [{item: items.cloth, amount: 2}], [{item: items.clothing1, amount: 1}]));
        manager.addRecipe(new Recipe("campfire1", [{item: items.sticks, amount: 8}, {item: items.twine, amount: 3}], tables.campfire));
        manager.addRecipe(new Recipe("composite1", [{item: items.clay, amount: 1}, {item: items.mud, amount: 1}], [{item: items.composite, amount: 1}]));
        manager.addRecipe(new Recipe("brick1", [{item: items.sticks, amount: 10}, {item: items.composite, amount: 2}], [{item: items.bricks, amount: 1}]));

    }
}