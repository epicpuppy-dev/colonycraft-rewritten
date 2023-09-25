import { ColonyCraft } from "../../../ColonyCraft";
import { JobTicker } from "./JobTicker";

export class Job {
    public id: string;
    public name: string;
    public workersAssigned: number = 0;
    private ticker: JobTicker;
    public unlocked: (game: typeof ColonyCraft) => boolean;
    public maxWorkers: (game: typeof ColonyCraft) => number;

    constructor(id: string, name: string, priority: number, unlocked: (game: typeof ColonyCraft) => boolean, maxWorkers: (game: typeof ColonyCraft) => number) {
        this.id = id;
        this.name = name;
        this.ticker = new JobTicker(this, priority);
        this.unlocked = unlocked;
        this.maxWorkers = maxWorkers;
    }

    public tick (game: typeof ColonyCraft) {};

    public assign (game: typeof ColonyCraft, amount: number) {
        this.workersAssigned += amount;
        game.colony.jobs.workersAssigned += amount;
    }

    public unassign (game: typeof ColonyCraft, amount: number) {
        this.workersAssigned -= amount;
        game.colony.jobs.workersAssigned -= amount;
    }
}