import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { PopulationUpdate } from "./PopulationUpdate";

export class Population implements Saveable {
    public babies: number;
    public children: number;
    public adults: number;
    public seniors: number;
    readonly initial: {b: number, c: number, a: number, s: number};
    private update: PopulationUpdate;

    constructor (game: ColonyCraft, babies: number, children: number, adults: number, seniors: number) {
        this.babies = babies;
        this.children = children;
        this.adults = adults;
        this.seniors = seniors;
        this.initial = {b: babies, c: children, a: adults, s: seniors};
        this.update = new PopulationUpdate(game);

        game.save.register(this, "pop");
    }

    public save (): string {
        return `${this.babies.toString(36)}-${this.children.toString(36)}-${this.adults.toString(36)}-${this.seniors.toString(36)}`;
    }

    public load (data: string) {
        let split = data.split("-");
        if (!isNaN(parseInt(split[0], 36))) this.babies = parseInt(split[0], 36);
        if (!isNaN(parseInt(split[1], 36))) this.children = parseInt(split[1], 36);
        if (!isNaN(parseInt(split[2], 36))) this.adults = parseInt(split[2], 36);
        if (!isNaN(parseInt(split[3], 36))) this.seniors = parseInt(split[3], 36);
    }

    public newGame() {
        this.babies = this.initial.b;
        this.children = this.initial.c;
        this.adults = this.initial.a;
        this.seniors = this.initial.s;
    }
}