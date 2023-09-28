import { ColonyCraft } from "../ColonyCraft";
import { Job } from "../features/colony/jobs/Job";
import { Jobs } from "../features/colony/jobs/Jobs";
import { ResourceJob } from "../features/colony/jobs/custom/ResourceJob";

export class JobData {
    public static addJobs (game: ColonyCraft, jobs: Jobs) {
        const tables = game.loot.loot;
        jobs.addJob(new ResourceJob(game, "forager", "Forager", 0, 6, tables.forager, () => true, () => Infinity));
        jobs.addJob(new Job(game, "invention", "Thinker", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "math", "Mathematician", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "physics", "Physicist", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "chemistry", "Chemist", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "biology", "Biologist", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "quantum", "Quantum Scientist", 20, () => true, () => Infinity));
    }
}