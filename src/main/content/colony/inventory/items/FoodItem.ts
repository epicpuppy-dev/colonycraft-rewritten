import { ColonyCraft } from "../../../../ColonyCraft";
import { Item } from "../Item";

export class FoodItem extends Item {
    public saturation: number; // how filling the food is (1 unit = 1 adult/tick OR 2 children or seniors/tick OR 5 babies/tick)
    public health: number; // how healthy the food is (If 100% of food consumption (by saturation) is this, then health changes by 1 unit = 0.033% / tick)
    public morale: number; // how much morale the food gives (If 100% of food consumption (by saturation) is this, then morale changes by 1 unit = 0.1% / tick)
    public priority: number; // how much priority the food has (higher priority means it is consumed first, equal priorities will consume food at random)

    constructor(game: ColonyCraft, id: string, volume: number, name: string, decay: number, saturation: number, health: number, morale: number, priority: number) {
        super(game, id, volume, name, decay);
        this.saturation = saturation;
        this.health = health;
        this.morale = morale;
        this.priority = priority;
    }
}