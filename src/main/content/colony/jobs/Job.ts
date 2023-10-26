import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { Item } from "../inventory/Item";
import { JobTicker } from "./JobTicker";

export class Job implements Saveable {
    public id: string;
    public name: string;
    public workersAssigned: number = 0;
    private ticker: JobTicker;
    public unlocked: (game: ColonyCraft) => boolean;
    public maxWorkers: (game: ColonyCraft) => number;
    public desc: string;
    public cost?: {item: Item, amount: number};
    public priority;

    constructor(game: ColonyCraft, id: string, name: string, priority: number, unlocked: (game: ColonyCraft) => boolean, maxWorkers: (game: ColonyCraft) => number, desc: string = "", cost?: {item: any, amount: number}) {
        this.id = id;
        this.name = name;
        this.ticker = new JobTicker(game, this, priority);
        this.priority = priority;
        this.unlocked = unlocked;
        this.maxWorkers = maxWorkers;
        this.desc = desc;
        this.cost = cost;

        game.save.register(this, "job." + this.id);
    }

    public tick (game: ColonyCraft) {};

    public assign (game: ColonyCraft, amount: number) {
        this.workersAssigned += amount;
        game.colony.jobs.workersAssigned += amount;
        if (this.cost) this.cost.item.amount -= this.cost.amount * amount;
    }

    public unassign (game: ColonyCraft, amount: number) {
        this.workersAssigned -= amount;
        game.colony.jobs.workersAssigned -= amount;
        if (this.cost) this.cost.item.amount += this.cost.amount * amount;
    }

    public save (): string {
        if (this.workersAssigned == 0) return "";
        return `${this.workersAssigned.toString(36)}`;
    }

    public load (data: string) {
        if (!isNaN(parseInt(data, 36))) this.workersAssigned = parseInt(data, 36);
    }

    public newGame() {
        this.workersAssigned = 0;
    }
}