import { Item } from "../Item";

export class FluidItem extends Item {
    public saturation: number; // how filling the fluid is (1 unit = 1 adult/tick OR 2 children or seniors/tick OR 5 babies/tick)
    public health: number; // how healthy the fluid is (If 100% of fluid consumption (by saturation) is this, then health changes by 1 unit = 0.1% / tick)
    public morale: number; // how much morale the fluid gives (If 100% of fluid consumption (by saturation) is this, then morale changes by 1 unit = 0.1% / tick)
    public priority: number; // how much priority the fluid has (higher priority means it is consumed first, equal priorities will consume fluid at random)

    constructor(id: string, volume: number, name: string, decay: number, saturation: number, health: number, morale: number, priority: number) {
        super(id, volume, name, decay);
        this.saturation = saturation;
        this.health = health;
        this.morale = morale;
        this.priority = priority;
    }
}