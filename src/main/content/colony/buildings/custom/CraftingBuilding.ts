import { ColonyCraft } from "../../../../ColonyCraft";
import { Recipe } from "../../crafting/Recipe";
import { Item } from "../../inventory/Item";
import { Building } from "../Building";

export class CraftingBuilding extends Building {
    private recipe: Recipe;
    private crafts: number;

    constructor (game: ColonyCraft, id: string, name: string, area: number, work: number, priority: number, recipe: Recipe, crafts: number, desc: string[] = [], cost: {item: Item, amount: number}[] = [], available: (game: ColonyCraft) => boolean = () => true, maximum: (game: ColonyCraft) => number = (game) => Math.floor((game.colony.buildings.landMax - game.colony.buildings.landPending) / this.area + this.target)) {
        super(game, id, name, area, work, priority, desc, cost, available, maximum);
        this.recipe = recipe;
        this.crafts = crafts;
    }

    public tick (game: ColonyCraft) {
        if (this.amount > 0) this.recipe.craft(this.amount * this.crafts);
    }
}