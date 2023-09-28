import { ColonyCraft } from "../../../ColonyCraft";
import { PopulationUpdate } from "./PopulationUpdate";

export class Population {
    public babies: number;
    public children: number;
    public adults: number;
    public seniors: number;
    private update: PopulationUpdate;

    constructor (game: ColonyCraft, babies: number, children: number, adults: number, seniors: number) {
        this.babies = babies;
        this.children = children;
        this.adults = adults;
        this.seniors = seniors;
        this.update = new PopulationUpdate(game);
    }
}