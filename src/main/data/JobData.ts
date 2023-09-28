import { ColonyCraft } from "../ColonyCraft";
import { Job } from "../features/colony/jobs/Job";
import { Jobs } from "../features/colony/jobs/Jobs";
import { ResourceJob } from "../features/colony/jobs/custom/ResourceJob";

export class JobData {
    public static addJobs (jobs: Jobs) {
        const tables = ColonyCraft.loot.loot;
        jobs.addJob(new ResourceJob("forager", "Forager", 0, 6, tables.forager, () => true, () => Infinity));
        jobs.addJob(new Job("invention", "Thinker", 20, () => true, () => Infinity));
        jobs.addJob(new Job("math", "Mathematician", 20, () => true, () => Infinity));
        jobs.addJob(new Job("physics", "Physicist", 20, () => true, () => Infinity));
        jobs.addJob(new Job("chemistry", "Chemist", 20, () => true, () => Infinity));
        jobs.addJob(new Job("biology", "Biologist", 20, () => true, () => Infinity));
        jobs.addJob(new Job("quantum", "Quantum Scientist", 20, () => true, () => Infinity));
    }
}