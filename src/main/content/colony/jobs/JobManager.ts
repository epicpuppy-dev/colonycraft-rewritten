import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { Job } from "./Job";
import { JobGroup } from "./JobGroup";

export class JobManager implements Saveable {
    public jobs: { [key: string]: Job } = {};
    public groups: { [key: string]: JobGroup } = {};
    public groupPriority: string[] = [];
    public workersAssigned: number = 0;

    constructor (game: ColonyCraft) {
        game.save.register(this, "job");
    }

    public addGroup(group: JobGroup) {
        this.groups[group.key] = group;
        this.groupPriority.push(group.key);
        this.groupPriority.sort((a, b) => {
            return this.groups[a].priority - this.groups[b].priority;
        });
    }

    public addGroupWithJobs(group: JobGroup, jobs: Job[]) {
        this.addGroup(group);
        for (let job of jobs) {
            this.addJob(group, job);
        }
    }

    public addJob (group: JobGroup, job: Job) {
        this.jobs[job.id] = job;
        group.jobs.push(job);
    }

    public save (): string {
        return `${this.workersAssigned.toString(36)}`;
    }

    public load (data: string) {
        if (!isNaN(parseInt(data, 36))) this.workersAssigned = parseInt(data, 36);
    }

    public newGame() {
        this.workersAssigned = 0;
    }
}