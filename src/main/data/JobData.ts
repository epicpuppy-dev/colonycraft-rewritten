import { ColonyCraft } from "../ColonyCraft";
import { Jobs } from "../features/colony/jobs/Jobs";
import { ResourceJob } from "../features/colony/jobs/custom/ResourceJob";

export class JobData {
    public static addJobs (jobs: Jobs) {
        const tables = ColonyCraft.loot.loot;
        jobs.addJob(new ResourceJob("forager", "Forager", 0, 6, tables.forager, () => true, () => Infinity));
        jobs.addJob(new ResourceJob("test1", "Test Job", 1, 0, tables.forager, () => true, () => 5));
        jobs.addJob(new ResourceJob("test2", "Test Job", 2, 0, tables.forager, () => true, () => 55));
        jobs.addJob(new ResourceJob("test3", "Test Job", 3, 0, tables.forager, () => true, () => 555));
    }
}