import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class InventoryUpdate extends TickingEntity {
    constructor (game: ColonyCraft, priority: number) {
        super(game, priority);
    }

    public tick(game: ColonyCraft): void {
        const inventory = game.colony.inventory;

        inventory.storageUsed = 0;
        for (let key in inventory.items) {
            //inventory.items[key].amount += 100;
            inventory.storageUsed += inventory.items[key].volume * inventory.items[key].amount * 0.001;
        }
    }
}