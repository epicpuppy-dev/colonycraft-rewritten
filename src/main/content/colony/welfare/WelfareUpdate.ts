import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";
import { FluidItem } from "../inventory/items/FluidItem";
import { FoodItem } from "../inventory/items/FoodItem";

export class WelfareUpdate extends TickingEntity {
    constructor(game: ColonyCraft) {
        super(game, 50);
    }

    public tick(game: ColonyCraft): void {
        const welfare = game.colony.welfare;
        const population = game.colony.population;
        const inventory = game.colony.inventory;

        //health and morale trend to 0.5 by 2.5% of the difference per tick
        const decayConstant = 0.025;

        if (welfare.health > 0.5) {
            welfare.health -= (welfare.health - 0.5) / (1 / decayConstant);
        } else if (welfare.health < 0.5) {
            welfare.health += (0.5 - welfare.health) / (1 / decayConstant);
        }

        if (welfare.morale > 0.5) {
            welfare.morale -= (welfare.morale - 0.5) / (1 / decayConstant);
        } else if (welfare.morale < 0.5) {
            welfare.morale += (0.5 - welfare.morale) / (1 / decayConstant);
        }

        //starting out buff: if no jobs are assigned, morale and health do not change
        if (game.colony.jobs.workersAssigned == 0 && game.clock.dayTotal <= 1) return;

        //consume food
        const foodRequired = Math.ceil(game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5);
        const foodAvailable: FoodItem[] = [];
        for (const item in inventory.items) {
            if (inventory.items[item] instanceof FoodItem) {
                foodAvailable.push(inventory.items[item] as FoodItem);   
            }
        }
        foodAvailable.sort((a, b) => b.priority - a.priority);

        let foodConsumed = 0;
        let healthChange = 0;
        let moraleChange = 0;
        while (foodConsumed < foodRequired && foodAvailable.length > 0) {
            const food = foodAvailable.shift();
            if (food == null) break;
            const foodConsumedThisItem = Math.min(Math.max(0, food.amount - food.min), Math.ceil((foodRequired - foodConsumed) / food.saturation));
            foodConsumed += foodConsumedThisItem * food.saturation;
            healthChange += foodConsumedThisItem * food.health * food.saturation;
            moraleChange += foodConsumedThisItem * food.morale * food.saturation;
            food.amount -= foodConsumedThisItem;
        }

        if (foodConsumed < foodRequired) {
            healthChange -= (foodRequired - foodConsumed) * 15;
            moraleChange -= (foodRequired - foodConsumed) * 6;
        }

        welfare.foodSatisfaction = Math.min(foodConsumed / foodRequired, 1);

        //consume fluids
        const fluidsRequired = Math.ceil(game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5);
        const fluidsAvailable: FluidItem[] = [];
        for (const item in inventory.items) {
            if (inventory.items[item] instanceof FluidItem) {
                fluidsAvailable.push(inventory.items[item] as FluidItem);   
            }
        }
        fluidsAvailable.sort((a, b) => b.priority - a.priority);

        let fluidsConsumed = 0;
        while (fluidsConsumed < fluidsRequired && fluidsAvailable.length > 0) {
            const fluid = fluidsAvailable.shift();
            if (fluid == null) break;
            const fluidsConsumedThisItem = Math.min(Math.max(0, fluid.amount - fluid.min), Math.ceil((fluidsRequired - fluidsConsumed) / fluid.saturation));
            fluidsConsumed += fluidsConsumedThisItem * fluid.saturation;
            fluid.amount -= fluidsConsumedThisItem;
        }

        if (fluidsConsumed < fluidsRequired) {
            healthChange -= (fluidsRequired - fluidsConsumed) * 25;
            moraleChange -= (fluidsRequired - fluidsConsumed) * 8;
        }

        welfare.fluidSatisfaction = Math.min(fluidsConsumed / fluidsRequired, 1);

        // Welfare Items and Modifiers
        const itemsMax = Math.ceil(game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5);
        for (const item of welfare.welfareItems) {
            let maxConsumed = Math.min(Math.max(0, item.amount - item.min), itemsMax / item.saturation);
            healthChange += maxConsumed * item.health * item.saturation;
            moraleChange += maxConsumed * item.morale * item.saturation;
            if (item.type == "active") {
                item.amount -= Math.ceil(maxConsumed);
            }
        }

        for (const modifier of welfare.welfareModifiers) {
            healthChange += modifier.getHealth(game) / 1000;
            moraleChange += modifier.getMorale(game) / 1000;
        }

        // Make health take 3x longer to change
        healthChange /= 3;

        let negativeChangeModifier = Math.max(0, 2 * Math.log(game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5) / Math.log(100) - (5 / (game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5)));

        if (healthChange < 0) healthChange *= negativeChangeModifier;
        if (moraleChange < 0) moraleChange *= negativeChangeModifier;

        welfare.health = Math.min(Math.max(welfare.health + healthChange / itemsMax / 1000, 0), 1);
        welfare.morale = Math.min(Math.max(welfare.morale + moraleChange / itemsMax / 1000, 0), 1);

        welfare.healthModifier = 2 ** ((welfare.health - 0.5) * 2);
        welfare.workModifier = 2 ** ((welfare.morale - 0.5) * 2);
    }
}