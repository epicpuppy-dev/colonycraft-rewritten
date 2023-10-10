import { ColonyCraft } from "../../../ColonyCraft";
import { Building } from "./Building";
import { BuildingUpdate } from "./BuildingUpdate";

export class BuildingManager {
    public landMax: number = 10;
    public landUsed: number = 0;
    public landPending: number = 0;
    public buildings: {[key: string]: Building} = {};
    public buildingPriority: string[] = [];
    public queueSize: number = 0;
    public workLeft: number = 0;
    private update: BuildingUpdate;

    constructor (game: ColonyCraft) {
        this.update = new BuildingUpdate(game);
    }

    public addBuilding (building: Building) {
        this.buildings[building.id] = building;
        this.buildingPriority.push(building.id);
        this.buildingPriority.sort((a, b) => {
            return this.buildings[a].priority - this.buildings[b].priority;
        });
    }

    public queueBuilding (building: Building, amount: number) {
        if (amount > 0) {
            this.queueSize += amount;
            this.workLeft += amount * building.work;
            this.landPending += amount * building.area;
        } else if (amount < 0) {
            this.queueSize += Math.abs(amount);
            this.workLeft += Math.abs(amount);
            this.landPending -= Math.abs(amount) * building.area;
        }
        building.target += amount;
    }
}