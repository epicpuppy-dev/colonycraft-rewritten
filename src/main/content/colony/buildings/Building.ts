import { ColonyCraft } from "../../../ColonyCraft";
import { Item } from "../inventory/Item";
import { BuildingTicker } from "./BuildingTicker";

export class Building {
    public name: string;
    public id: string;
    public desc: string[];
    public area: number;
    public amount: number = 0;
    public target: number = 0;
    public progress: number = 0;
    public priority: number;
    public work: number;
    public cost: {item: Item, amount: number}[];
    public available: (game: ColonyCraft) => boolean;
    public maximum: (game: ColonyCraft) => number;
    private ticker: BuildingTicker;

    constructor (game: ColonyCraft, id: string, name: string, area: number, work: number, priority: number, desc: string[] = [], cost: {item: Item, amount: number}[] = [], available: (game: ColonyCraft) => boolean = () => true, maximum: (game: ColonyCraft) => number = (game) => Math.floor((game.colony.buildings.landMax - game.colony.buildings.landPending) / this.area + this.target)) {
        this.id = id;
        this.area = area;
        this.name = name;
        this.desc = desc;
        this.work = work;
        this.priority = priority;
        this.cost = cost;
        this.available = available;
        this.maximum = maximum;
        this.ticker = new BuildingTicker(game, this, priority)
    }

    public tick (game: ColonyCraft) {}
}