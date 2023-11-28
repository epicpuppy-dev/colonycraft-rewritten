import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";
import { Item } from "./Item";
import { FluidItem } from "./items/FluidItem";
import { FoodItem } from "./items/FoodItem";

export class InventoryUpdate extends TickingEntity {
    constructor (game: ColonyCraft, priority: number) {
        super(game, priority);
    }

    public tick(game: ColonyCraft): void {
        const inventory = game.colony.inventory;

        inventory.storageUsed = 0;
        inventory.foodTotal = 0;
        inventory.fluidTotal = 0;
        for (let key in inventory.items) {
            let item: Item = inventory.items[key];
            //inventory.items[key].amount += 100;
            inventory.storageUsed += item.volume * item.amount * 0.001;
            if (item instanceof FoodItem) {
                inventory.foodTotal += Math.max(0, item.amount - item.min) * item.saturation;
            }
            if (item instanceof FluidItem) {
                inventory.fluidTotal += Math.max(0, item.amount - item.min) * item.saturation;
            }
        }
    }
}