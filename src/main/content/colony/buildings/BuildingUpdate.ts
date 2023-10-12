import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class BuildingUpdate extends TickingEntity {
    public tick(game: ColonyCraft): void {
        //land update
        if (game.colony.jobs.jobs.explorer1.workersAssigned > 1000) {
            game.colony.buildings.landMax += Math.max(Math.floor(game.colony.jobs.jobs.explorer1.workersAssigned / 50 * game.colony.welfare.workModifier), 1);
        } else {
            for (let i = 0; i < game.colony.jobs.jobs.explorer1.workersAssigned; i++) {
                if (Math.random() < 0.02 * game.colony.welfare.workModifier) {
                    game.colony.buildings.landMax++;
                }
            }
        }

        const buildings = game.colony.buildings;
        let work = Math.max(Math.floor(game.colony.jobs.jobs.builder1.workersAssigned * game.colony.welfare.workModifier), 1);
        if (work == 0) return;
        for (const key of buildings.buildingPriority) {
            const building = buildings.buildings[key];
            if (building.amount == building.target) continue;
            if (building.amount > building.target) {
                const amount = Math.min(building.amount - building.target, work);
                building.amount -= amount;
                buildings.queueSize -= amount;
                buildings.landUsed -= amount * building.area;
                buildings.workLeft -= amount;
                work -= amount;
            } else if (buildings.landUsed < buildings.landMax) {
                const amount = Math.min((building.target - building.amount) * building.work - building.progress, work);
                building.progress += amount;
                buildings.workLeft -= amount;
                const built = Math.floor(building.progress / building.work);
                building.amount += built;
                buildings.landUsed += built * building.area;
                buildings.queueSize -= built;
                building.progress -= built * building.work;
                work -= amount;
            }
        }
    }
}