import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";
import { Building } from "./Building";

export class BuildingTicker extends TickingEntity {
    private building: Building;

    constructor (game: ColonyCraft, building: Building, priority: number = 20) {
        super(game, priority);
        this.building = building;
    }

    public tick(game: ColonyCraft): void {
        this.building.tick(game);
    }
}