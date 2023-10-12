import { Recipe } from "./Recipe";

export class RecipeManager {
    public recipes: { [key: string]: Recipe } = {};

    public addRecipe (recipe: Recipe) {
        this.recipes[recipe.id] = recipe;
    }
}