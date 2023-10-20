import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { Job } from "./Job";

export class JobManager implements Saveable {
    public jobs: { [key: string]: Job } = {};
    public jobPriority: string[] = [];
    public workersAssigned: number = 0;

    constructor (game: ColonyCraft) {
        game.save.register(this, "job");
    }

    public addJob (job: Job) {
        this.jobs[job.id] = job;
        this.jobPriority.push(job.id);
        this.jobPriority.sort((a, b) => {
            return this.jobs[a].priority - this.jobs[b].priority;
        });
    }

    public save (): string {
        return `${this.workersAssigned.toString(36)}`;
    }

    public load (data: string) {
        if (!isNaN(parseInt(data, 36))) this.workersAssigned = parseInt(data, 36);
    }
}