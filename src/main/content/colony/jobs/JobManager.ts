import { Job } from "./Job";

export class JobManager {
    public jobs: { [key: string]: Job } = {};
    public jobPriority: string[] = [];
    public workersAssigned: number = 0;

    public addJob (job: Job) {
        this.jobs[job.id] = job;
        this.jobPriority.push(job.id);
        this.jobPriority.sort((a, b) => {
            return this.jobs[a].priority - this.jobs[b].priority;
        });
    }
}