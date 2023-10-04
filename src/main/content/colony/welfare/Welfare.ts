import { ColonyCraft } from "../../../ColonyCraft";
import { WelfareUpdate } from "./WelfareUpdate";

export class Welfare {
    public health: number = 0.5;
    public morale: number = 0.5;
    public healthModifier: number = 1;
    public workModifier: number = 1;
    private update: WelfareUpdate;

    constructor(game: ColonyCraft) {
        this.update = new WelfareUpdate(game);
    }
}