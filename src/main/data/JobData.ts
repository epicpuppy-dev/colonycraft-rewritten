import { ColonyCraft } from "../ColonyCraft";
import { Job } from "../content/colony/jobs/Job";
import { JobManager } from "../content/colony/jobs/JobManager";
import { CraftingJob } from "../content/colony/jobs/custom/CraftingJob";
import { ResourceJob } from "../content/colony/jobs/custom/ResourceJob";

export class JobData {
    public static addJobs (game: ColonyCraft, jobs: JobManager) {
        const tables = game.loot.loot;
        const recipes = game.colony.recipes.recipes;

        jobs.addJob(new ResourceJob(game, "forager", "Forager", 0, 8, tables.forager, () => true, () => Infinity));
        jobs.addJob(new Job(game, "explorer1", "Scout", 10, () => true, () => Infinity));
        jobs.addJob(new Job(game, "invention1", "Thinker", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "math1", "Mathematician", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "physics1", "Physicist", 20, () => false, () => Infinity));
        jobs.addJob(new Job(game, "chemistry1", "Chemist", 20, () => false, () => Infinity));
        jobs.addJob(new Job(game, "biology1", "Biologist", 20, () => false, () => Infinity));
        jobs.addJob(new Job(game, "quantum1", "Quantum Scientist", 20, () => false, () => Infinity));
        jobs.addJob(new Job(game, "cultural1", "Artist", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "political1", "Politician", 20, () => false, () => Infinity));
        jobs.addJob(new Job(game, "religious1", "Cleric", 20, () => false, () => Infinity));
        jobs.addJob(new Job(game, "builder1", "Builder", 20, () => true, () => Infinity));
        jobs.addJob(new CraftingJob(game, "craftsman", "Craftsman", 10, 1, recipes.test, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test1", "Test 1", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test2", "Test 2", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test3", "Test 3", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test4", "Test 4", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test5", "Test 5", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test6", "Test 6", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test7", "Test 7", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test8", "Test 8", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test9", "Test 9", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test10", "Test 10", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test11", "Test 11", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test12", "Test 12", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test13", "Test 13", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test14", "Test 14", 20, () => true, () => Infinity));
        jobs.addJob(new Job(game, "test15", "Test 15", 20, () => true, () => Infinity));
    }
}