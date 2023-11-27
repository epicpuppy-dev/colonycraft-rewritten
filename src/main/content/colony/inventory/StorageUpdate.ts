import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class StorageUpdate extends TickingEntity {
    private storageBuildings: { [key: string]: number } = {};

    constructor (game: ColonyCraft) {
        super(game, 96);
    }

    public tick(game: ColonyCraft): void {
        const inventory = game.colony.inventory;
        const buildings = game.colony.buildings;
        inventory.storageCapacity = 10;
        inventory.foodTotal = 0;
        inventory.fluidTotal = 0;
        for (let key in this.storageBuildings) {
            inventory.storageCapacity += buildings.buildings[key].amount * this.storageBuildings[key];
        }
    }

    public addBuilding(building: string, storage: number) {
        this.storageBuildings[building] = storage;
    }
}