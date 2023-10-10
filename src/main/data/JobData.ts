import { ColonyCraft } from "../ColonyCraft";
import { Job } from "../content/colony/jobs/Job";
import { Jobs } from "../content/colony/jobs/Jobs";
import { ResourceJob } from "../content/colony/jobs/custom/ResourceJob";

export class JobData {
    public static addJobs (game: ColonyCraft, jobs: Jobs) {
        const tables = game.loot.loot;
        jobs.addJob(new ResourceJob(game, "forager", "Forager", 0, 8, tables.forager, () => true, () => Infinity));
        jobs.addJob(new Job(game, "invention1", "Thinker", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "math1", "Mathematician", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "physics1", "Physicist", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "chemistry1", "Chemist", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "biology1", "Biologist", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "quantum1", "Quantum Scientist", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "cultural1", "Artist", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "political1", "Politician", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "religious1", "Cleric", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "builder1", "Builder", 20, () => true, () => Infinity));
    }
}