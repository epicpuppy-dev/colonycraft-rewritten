import { ColonyCraft } from "../ColonyCraft";
import { Recipe } from "../content/colony/crafting/Recipe";
import { RecipeManager } from "../content/colony/crafting/RecipeManager";

export class RecipeData {
    public static addRecipes (game: ColonyCraft, manager: RecipeManager) {
        const items = game.colony.inventory.items;
        const tables = game.loot.loot;

        // Lumber
        manager.addRecipe(new Recipe("planks1", [{item: items.logs, amount: 1}], [{item: items.lumber, amount: 4}]));

        // Tools
        manager.addRecipe(new Recipe("tool1", [{item: items.rocks, amount: 4}], [{item: items.tool1, amount: 1}]));
        manager.addRecipe(new Recipe("tool2", [{item: items.tool1, amount: 2}, {item: items.twine, amount: 4}], [{item: items.tool2, amount: 1}]));

        // Other
        manager.addRecipe(new Recipe("twine1", [{item: items.fibre, amount: 4}], [{item: items.twine, amount: 1}]));
        manager.addRecipe(new Recipe("campfire1", [{item: items.sticks, amount: 8}, {item: items.twine, amount: 4}], [{item: items.campfire, amount: 1}]));
        manager.addRecipe(new Recipe("composite1", [{item: items.clay, amount: 2}, {item: items.mud, amount: 2}], [{item: items.stoneBricks, amount: 1}]));
        manager.addRecipe(new Recipe("brick1", [{item: items.sticks, amount: 10}, {item: items.composite, amount: 2}], [{item: items.bricks, amount: 1}]));
    }
}