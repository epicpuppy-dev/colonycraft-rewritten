import { ColonyCraft } from "../../../ColonyCraft";
import { JobTicker } from "./JobTicker";

export class Job {
    public id: string;
    public name: string;
    public workersAssigned: number = 0;
    private ticker: JobTicker;
    public unlocked: (game: ColonyCraft) => boolean;
    public maxWorkers: (game: ColonyCraft) => number;

    constructor(game: ColonyCraft, id: string, name: string, priority: number, unlocked: (game: ColonyCraft) => boolean, maxWorkers: (game: ColonyCraft) => number) {
        this.id = id;
        this.name = name;
        this.ticker = new JobTicker(game, this, priority);
        this.unlocked = unlocked;
        this.maxWorkers = maxWorkers;
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
}