import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";
import { Job } from "./Job";

export class JobTicker extends TickingEntity {
    private job: Job;

    constructor (game: ColonyCraft, job: Job, priority: number = 20) {
        super(game, priority);
        this.job = job;
    }

    public tick(game: ColonyCraft): void {
        if (this.job.workersAssigned > this.job.maxWorkers(game)) {
            this.job.unassign(game, this.job.workersAssigned - this.job.maxWorkers(game));
        }
        this.job.tick(game);
    }
}