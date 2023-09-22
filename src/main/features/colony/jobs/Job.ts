import { ColonyCraft } from "../../../ColonyCraft";

export class Job {
    public name: string;
    public workersAssigned: number = 0;
    public tick: (game: ColonyCraft) => void;

    constructor(name: string, tick: (game: ColonyCraft) => void) {
        this.name = name;
        this.tick = tick;
    }

    public assign (game: typeof ColonyCraft, amount: number) {
        this.workersAssigned += amount;
    }

    public unassign (game: typeof ColonyCraft, amount: number) {
        this.workersAssigned -= amount;
    }
}