import { ColonyCraft } from "../../../../ColonyCraft";
import { Item } from "../../inventory/Item";
import { Building } from "../Building";

export class StorageBuilding extends Building {
    constructor (game: ColonyCraft, id: string, name: string, area: number, work: number, priority: number, storage: number, description?: string[], cost?: {item: Item, amount: number}[], available?: (game: ColonyCraft) => boolean, maximum?: (game: ColonyCraft) => number) {
        super(game, id, name, area, work, priority, description, cost, available, maximum);
        game.colony.inventory.storageUpdate.addBuilding(id, storage);
    }
}