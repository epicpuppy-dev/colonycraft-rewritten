import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";
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
            const foodConsumedThisItem = Math.min(food.amount, (foodRequired - foodConsumed) / food.saturation);
            foodConsumed += foodConsumedThisItem * food.saturation;
            healthChange += foodConsumedThisItem * food.health * food.saturation;
            moraleChange += foodConsumedThisItem * food.morale * food.saturation;
            food.amount -= foodConsumedThisItem;
        }

        if (foodConsumed < foodRequired) {
            healthChange -= (foodRequired - foodConsumed) * 5;
            moraleChange -= (foodRequired - foodConsumed) * 5;
        }

        welfare.health = Math.min(Math.max(welfare.health + healthChange / foodRequired / 1000, 0), 1);
        welfare.morale = Math.min(Math.max(welfare.morale + moraleChange / foodRequired / 1000, 0), 1);

        //consume fluids
        const fluidsRequired = Math.ceil(game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5);
        const fluidsAvailable: FoodItem[] = [];
        for (const item in inventory.items) {
            if (inventory.items[item] instanceof FoodItem) {
                fluidsAvailable.push(inventory.items[item] as FoodItem);   
            }
        }
        fluidsAvailable.sort((a, b) => b.priority - a.priority);

        let fluidsConsumed = 0;
        healthChange = 0;
        moraleChange = 0;
        while (fluidsConsumed < fluidsRequired && fluidsAvailable.length > 0) {
            const fluid = fluidsAvailable.shift();
            if (fluid == null) break;
            const fluidsConsumedThisItem = Math.min(fluid.amount, (fluidsRequired - fluidsConsumed) / fluid.saturation);
            fluidsConsumed += fluidsConsumedThisItem * fluid.saturation;
            fluid.amount -= fluidsConsumedThisItem;
        }

        if (fluidsConsumed < fluidsRequired) {
            healthChange -= (fluidsRequired - fluidsConsumed) * 10;
            moraleChange -= (fluidsRequired - fluidsConsumed) * 10;
        }

        welfare.health = Math.min(Math.max(welfare.health + healthChange / fluidsRequired / 1000, 0), 1);
        welfare.morale = Math.min(Math.max(welfare.morale + moraleChange / fluidsRequired / 1000, 0), 1);

        welfare.healthModifier = 2 ** ((welfare.health - 0.5) * 2);
        welfare.workModifier = 2 ** ((welfare.morale - 0.5) * 2);
    }
}