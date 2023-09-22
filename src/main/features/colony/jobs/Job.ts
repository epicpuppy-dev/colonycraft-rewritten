import { ColonyCraft } from "../../../ColonyCraft";
import { JobTicker } from "./JobTicker";

export class Job {
    public name: string;
    public workersAssigned: number = 0;
    private ticker: JobTicker;
    public unlocked: (game: typeof ColonyCraft) => boolean;

    constructor(name: string, priority: number, unlocked: (game: typeof ColonyCraft) => boolean) {
        this.name = name;
        this.ticker = new JobTicker(this, priority);
        this.unlocked = unlocked;
    }

    public tick (game: typeof ColonyCraft) {};

    public assign (game: typeof ColonyCraft, amount: number) {
        this.workersAssigned += amount;
    }

    public unassign (game: typeof ColonyCraft, amount: number) {
        this.workersAssigned -= amount;
    }
}