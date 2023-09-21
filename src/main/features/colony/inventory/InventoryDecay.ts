import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class InventoryDecay extends TickingEntity {
    constructor () {
        super(99);
    }

    public tick(game: typeof ColonyCraft): void {
        const inventory = game.colony.inventory;

        inventory.storageUsed = 0;
        for (let key in inventory.items) {
            //inventory.items[key].amount++;
            inventory.items[key].amount -= Math.ceil(inventory.items[key].amount * inventory.items[key].decay*Math.max(inventory.storageUsed/inventory.storageCapacity, 1));
        }
    }
}