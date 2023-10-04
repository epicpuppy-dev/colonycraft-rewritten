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
        this.job.tick(game);
    }
}