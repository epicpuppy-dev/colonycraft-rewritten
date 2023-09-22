import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";
import { Job } from "./Job";

export class JobTicker extends TickingEntity {
    private job: Job;

    constructor (job: Job, priority: number = 50) {
        super(priority);
        this.job = job;
    }

    public tick(game: typeof ColonyCraft): void {
        this.job.tick(game);
    }
}