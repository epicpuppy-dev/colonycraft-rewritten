import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { WelfareItem } from "../inventory/items/WelfareItem";
import { WelfareUpdate } from "./WelfareUpdate";

export class Welfare implements Saveable {
    public health: number = 0.5;
    public morale: number = 0.5;
    public healthModifier: number = 1;
    public workModifier: number = 1;
    public welfareItems: WelfareItem[] = [];
    private update: WelfareUpdate;

    constructor(game: ColonyCraft) {
        this.update = new WelfareUpdate(game);
        
        game.save.register(this, "welfare");
    }

    public save (): string {
        return `${this.health.toFixed(3)}-${this.morale.toFixed(3)}`;
    }

    public load (data: string) {
        let split = data.split("-");
        if (!isNaN(parseFloat(split[0]))) this.health = parseFloat(split[0]);
        if (!isNaN(parseFloat(split[1]))) this.morale = parseFloat(split[1]);
    }
}