import { ColonyCraft } from "../ColonyCraft";
import { Recipe } from "../content/colony/crafting/Recipe";
import { RecipeManager } from "../content/colony/crafting/RecipeManager";

export class RecipeData {
    public static addRecipes (game: ColonyCraft, manager: RecipeManager) {
        const items = game.colony.inventory.items;
        const tables = game.loot.loot;

        manager.addRecipe(new Recipe("test", [
            {item: items.sticks, amount: 1},
            {item: items.rocks, amount: 1}
        ], [
            {item: items.logs, amount: 1}
        ]))
    }
}