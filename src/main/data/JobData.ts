import { ColonyCraft } from "../ColonyCraft";
import { Jobs } from "../features/colony/jobs/Jobs";
import { ResourceJob } from "../features/colony/jobs/custom/ResourceJob";

export class JobData {
    public static addJobs (jobs: Jobs) {
        const tables = ColonyCraft.loot.loot;
        jobs.addJob(new ResourceJob("forager", 0, 6, tables.forager, () => true));
        jobs.jobs.forager.workersAssigned = 5;
    }
}