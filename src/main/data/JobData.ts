import { ColonyCraft } from "../ColonyCraft";
import { Job } from "../content/colony/jobs/Job";
import { JobManager } from "../content/colony/jobs/JobManager";
import { CraftingJob } from "../content/colony/jobs/custom/CraftingJob";
import { ResourceJob } from "../content/colony/jobs/custom/ResourceJob";

export class JobData {
    public static addJobs (game: ColonyCraft, jobs: JobManager) {
        const tables = game.loot.loot;
        const recipes = game.colony.recipes.recipes;
        const techs = game.colony.research.technologies;
        const traits = game.colony.traits.traits;
        const items = game.colony.inventory.items;
        const buildings = game.colony.buildings.buildings;

        // Gathering Jobs
        jobs.addJob(new ResourceJob(game, "forager", "Forager", 0, 10, tables.forager, () => true, () => Infinity));
        jobs.addJob(new ResourceJob(game, "woodcutter", "Woodcutter", 0, 3, tables.woodcutter, () => techs.chopping1.unlocked, () => jobs.jobs.woodcutter.workersAssigned + items.tool1.amount, "Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new ResourceJob(game, "digger", "Digger", 0, 8, tables.digger, () => techs.digging1.unlocked, () => jobs.jobs.digger.workersAssigned + items.tool1.amount, "Cost: 1 primitive tool", {item: items.tool1, amount: 1}));

        // Exploration Jobs
        jobs.addJob(new Job(game, "explorer1", "Scout", 10, () => techs.explore1.unlocked, () => Infinity, "Explores the surrounding area"));

        // Discovery Jobs
        jobs.addJob(new Job(game, "invention1", "Thinker", 20, () => true, () => Infinity, "Generates Invention Discoveries"));
        jobs.addJob(new Job(game, "math1", "Counter", 20, () => techs.math1.unlocked, () => Infinity, "Generates Math Discoveries"));
        jobs.addJob(new Job(game, "physics1", "Physicist", 20, () => false, () => Infinity, "Generates Physics Discoveries"));
        jobs.addJob(new Job(game, "chemistry1", "Chemist", 20, () => false, () => Infinity, "Generates Chemistry Discoveries"));
        jobs.addJob(new Job(game, "biology1", "Biologist", 20, () => false, () => Infinity, "Generates Biology Discoveries"));
        jobs.addJob(new Job(game, "quantum1", "Quantum Scientist", 20, () => false, () => Infinity, "Generates Quantum Discoveries"));

        // Development Jobs
        jobs.addJob(new Job(game, "cultural1", "Artist", 20, () => false, () => Infinity, "Generates Cultural Developments"));
        jobs.addJob(new Job(game, "political1", "Politician", 20, () => false, () => Infinity, "Generates Political Developments"));
        jobs.addJob(new Job(game, "religious1", "Cleric", 20, () => false, () => Infinity, "Generates Religious Developments"));

        // Building Jobs
        jobs.addJob(new Job(game, "builder1", "Builder", 10, () => techs.build1.unlocked, () => Infinity, "Builds buildings"));

        // Production Jobs
        jobs.addJob(new CraftingJob(game, "craftTwine1", "Twine Maker", 10, 2, recipes.twine1, () => techs.twine1.unlocked, () => Infinity, "Crafts 4 fibre -> 1 twine"));
        jobs.addJob(new CraftingJob(game, "craftTool1", "Toolmaker", 10, 1, recipes.tool1, () => techs.tools1.unlocked, () => Infinity, "Crafts 4 rocks -> 1 primitive tool"));
        jobs.addJob(new CraftingJob(game, "firemaker1", "Firemaker", 10, 1, recipes.campfire1, () => techs.fire1.unlocked, () => jobs.jobs.firemaker1.workersAssigned + items.tool1.amount, "Crafts 8 sticks + 4 twine -> 50% chance of 1 campfire, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new CraftingJob(game, "craftPlanks1", "Carpenter", 10, 2, recipes.planks1, () => techs.planks1.unlocked, () => jobs.jobs.craftPlanks1.workersAssigned + items.tool1.amount, "Crafts 1 log -> 4 planks, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new CraftingJob(game, "craftComposite1", "Composite Shaper", 10, 4, recipes.composite1, () => techs.composite1.unlocked, () => jobs.jobs.craftBricks1.workersAssigned + items.tool1.amount, "Crafts 2 mud + 2 clay -> 1 brick composite, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new CraftingJob(game, "craftBricks1", "Brickmaker", 10, 2, recipes.brick1, () => techs.bricks1.unlocked, () => buildings.kiln1.amount, "Crafts 10 sticks + 2 brick composite -> 1 brick, Req: 1 basic kiln"));
    }
}