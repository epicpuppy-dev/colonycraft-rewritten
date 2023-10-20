import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { WelfareUpdate } from "./WelfareUpdate";

export class Welfare implements Saveable {
    public health: number = 0.5;
    public morale: number = 0.5;
    public healthModifier: number = 1;
    public workModifier: number = 1;
    private update: WelfareUpdate;

    constructor(game: ColonyCraft) {
        this.update = new WelfareUpdate(game);
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