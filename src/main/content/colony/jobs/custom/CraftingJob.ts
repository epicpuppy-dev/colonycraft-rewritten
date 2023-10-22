import { ColonyCraft } from "../../../../ColonyCraft";
import { Recipe } from "../../crafting/Recipe";
import { Job } from "../Job";

export class CraftingJob extends Job {
    private recipe: Recipe;
    private crafts: number;

    constructor(game: ColonyCraft, id: string, name: string, priority: number, crafts: number, recipe: Recipe, unlocked: (game: ColonyCraft) => boolean, maxWorkers: (game: ColonyCraft) => number, desc?: string, cost?: {item: any, amount: number}) {
        super(game, id, name, priority, unlocked, maxWorkers, desc, cost);
        this.recipe = recipe;
        this.crafts = crafts;
    }

    public tick (game: ColonyCraft) {
        if (this.workersAssigned > 0) this.recipe.craft(this.workersAssigned * this.crafts);
    }
}