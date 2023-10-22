import { ColonyCraft } from "../../../../ColonyCraft";
import { Item } from "../Item";

export class WelfareItem extends Item {
    public saturation: number; // how many people this affects (1 unit = 1 adult/tick OR 2 children or seniors/tick OR 5 babies/tick)
    public health: number; // health buff 1 unit = 0.033% / tick IF everyone has this item
    public morale: number; // morale buff 1 unit = 0.1% / tick IF everyone has this item
    public type: "passive" | "active"; // passive = not consumed, active = consumed

    constructor(game: ColonyCraft, id: string, volume: number, name: string, decay: number, saturation: number, health: number, morale: number, type: "passive" | "active") {
        super(game, id, volume, name, decay);
        this.saturation = saturation;
        this.health = health;
        this.morale = morale;
        this.type = type;

        game.colony.welfare.addWelfareItem(this);
    }
}