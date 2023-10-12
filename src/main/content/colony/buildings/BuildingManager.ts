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

    public queueBuilding (game: ColonyCraft, building: Building, amount: number) {
        let clampAmount = Math.max(Math.min(amount, building.maximum(game) - building.target), -building.target);
        if (clampAmount > 0 && building.target < building.amount) {
            let builds = Math.min(building.amount - building.target, clampAmount);
            if (building.cost.length > 0) {
                let canBuild = Infinity;
                for (const cost of building.cost) {
                    const resource = cost.item;
                    const amount = Math.floor(resource.amount / cost.amount);
                    canBuild = Math.min(canBuild, amount);
                }
                builds = Math.min(builds, canBuild);
            }
            this.landPending += builds * building.area;
            this.workLeft -= builds;
            this.queueSize -= builds;
            building.target += builds;
            clampAmount -= builds;
        } else if (clampAmount < 0 && building.target > building.amount) {
            let builds = Math.min(building.target - building.amount, Math.abs(clampAmount));
            this.landPending -= builds * building.area;
            this.workLeft -= builds * building.work;
            this.queueSize -= builds;
            building.target -= builds;
            if (building.target == building.amount) {
                this.workLeft += building.progress;
                building.progress = 0;
            }
            clampAmount += builds;
            for (const cost of building.cost) {
                const resource = cost.item;
                resource.amount += cost.amount * builds;
            }
        }
        if (clampAmount > 0) {
            if (building.cost.length > 0) {
                let canBuild = Infinity;
                for (const cost of building.cost) {
                    const resource = cost.item;
                    const amount = Math.floor(resource.amount / cost.amount);
                    canBuild = Math.min(canBuild, amount);
                }
                clampAmount = Math.min(clampAmount, canBuild);
            }
            this.queueSize += clampAmount;
            this.workLeft += clampAmount * building.work;
            this.landPending += clampAmount * building.area;
            for (const cost of building.cost) {
                const resource = cost.item;
                resource.amount -= cost.amount * clampAmount;
            }
        } else if (clampAmount < 0) {
            this.queueSize += Math.abs(clampAmount);
            this.workLeft += Math.abs(clampAmount);
            this.landPending -= Math.abs(clampAmount) * building.area;
        }
        building.target += clampAmount;
    }
}