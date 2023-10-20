import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { JobTicker } from "./JobTicker";

export class Job implements Saveable {
    public id: string;
    public name: string;
    public workersAssigned: number = 0;
    private ticker: JobTicker;
    public unlocked: (game: ColonyCraft) => boolean;
    public maxWorkers: (game: ColonyCraft) => number;
    public priority;

    constructor(game: ColonyCraft, id: string, name: string, priority: number, unlocked: (game: ColonyCraft) => boolean, maxWorkers: (game: ColonyCraft) => number) {
        this.id = id;
        this.name = name;
        this.ticker = new JobTicker(game, this, priority);
        this.priority = priority;
        this.unlocked = unlocked;
        this.maxWorkers = maxWorkers;

        game.save.register(this, "job." + this.id);
    }

    public tick (game: ColonyCraft) {};

    public assign (game: ColonyCraft, amount: number) {
        this.workersAssigned += amount;
        game.colony.jobs.workersAssigned += amount;
    }

    public unassign (game: ColonyCraft, amount: number) {
        this.workersAssigned -= amount;
        game.colony.jobs.workersAssigned -= amount;
    }

    public save (): string {
        if (this.workersAssigned == 0) return "";
        return `${this.workersAssigned.toString(36)}`;
    }

    public load (data: string) {
        if (!isNaN(parseInt(data, 36))) this.workersAssigned = parseInt(data, 36);
    }
}