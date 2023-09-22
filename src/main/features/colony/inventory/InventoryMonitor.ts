import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class InventoryMonitor extends TickingEntity {
    constructor (priority: number) {
        super(priority);
    }

    public tick(game: typeof ColonyCraft): void {
        const inventory = game.colony.inventory;

        inventory.storageUsed = 0;
        for (let key in inventory.items) {
            inventory.items[key].amount ++;
            inventory.storageUsed += inventory.items[key].volume * inventory.items[key].amount * 0.001;
        }
    }
}