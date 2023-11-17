import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class InventoryDecay extends TickingEntity {
    constructor (game: ColonyCraft) {
        super(game, 98);
    }

    public tick(game: ColonyCraft): void {
        const inventory = game.colony.inventory;

        for (let key in inventory.items) {
            //inventory.items[key].amount++;
            let decay = Math.max(inventory.items[key].amount * inventory.items[key].decay * Math.max((inventory.storageUsed / inventory.storageCapacity) ** 2, 1), 0);
            if (decay < 1) {
                inventory.items[key].amount -= Math.random() < decay ? 1 : 0;
            } else {
                inventory.items[key].amount -= Math.ceil(decay);
            }
        }
    }
}