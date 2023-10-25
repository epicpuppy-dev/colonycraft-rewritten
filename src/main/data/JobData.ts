import { ColonyCraft } from "../ColonyCraft";
import { Job } from "../content/colony/jobs/Job";
import { JobManager } from "../content/colony/jobs/JobManager";
import { BuilderJob } from "../content/colony/jobs/custom/BuilderJob";
import { CraftingJob } from "../content/colony/jobs/custom/CraftingJob";
import { ResourceJob } from "../content/colony/jobs/custom/ResourceJob";
import { SeasonalResourceJob } from "../content/colony/jobs/custom/SeasonalResourceJob";

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
        jobs.addJob(new ResourceJob(game, "gatherer", "Gatherer", 0, 20, tables.gatherer, () => techs.gatherer1.unlocked, () => jobs.jobs.gatherer.workersAssigned + Math.floor(items.basket1.amount / 2), "Cost: 2 basic baskets", {item: items.basket1, amount: 2}));
        jobs.addJob(new ResourceJob(game, "woodcutter", "Woodcutter", 0, 3, tables.woodcutter, () => techs.chopping1.unlocked, () => jobs.jobs.woodcutter.workersAssigned + items.tool1.amount, "Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new ResourceJob(game, "digger", "Digger", 0, 8, tables.digger, () => techs.digging1.unlocked, () => jobs.jobs.digger.workersAssigned + items.tool1.amount, "Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new ResourceJob(game, "water", "Water Gatherer", 0, 12, tables.water, () => techs.water1.unlocked, () => jobs.jobs.water.workersAssigned + Math.floor(items.bucket1.amount / 2), "Cost: 2 wooden buckets", {item: items.bucket1, amount: 2}));
        jobs.addJob(new ResourceJob(game, "fisher1", "Hand Fisher", 0, 10, tables.fish, () => techs.fishing1.unlocked, () => Infinity));
        jobs.addJob(new ResourceJob(game, "fisher2", "Spear Fisher", 0, 20, tables.fish, () => techs.fishing2.unlocked, () => jobs.jobs.fisher2.workersAssigned + items.tool2.amount, "Cost: 1 basic tool", {item: items.tool2, amount: 1}));
        jobs.addJob(new ResourceJob(game, "hunter1", "Endurance Hunter", 0, 10, tables.hunter, () => techs.hunting1.unlocked, () => Infinity));
        jobs.addJob(new ResourceJob(game, "hunter2", "Spear Hunter", 0, 20, tables.hunter, () => techs.hunting2.unlocked, () => jobs.jobs.hunter2.workersAssigned + items.tool2.amount, "Cost: 1 basic tool", {item: items.tool2, amount: 1}));

        // Farming Jobs
        jobs.addJob(new SeasonalResourceJob(game, "wheat1", "Wheat Gatherer", 0, [8, 16, 12, 0], tables.wheat, () => techs.wheat1.unlocked, () => Math.min(jobs.jobs.wheat1.workersAssigned + items.tool1.amount, buildings.wheat1.amount), "Cost: 1 primitive tool, Req: 1 Wheat Patch", {item: items.tool1, amount: 1}));
        jobs.addJob(new SeasonalResourceJob(game, "potato1", "Potato Gatherer", 0, [6, 10, 8, 4], tables.potato, () => techs.potato1.unlocked, () => Math.min(jobs.jobs.potato1.workersAssigned + items.tool1.amount, buildings.potato1.amount), "Cost: 1 primitive tool, Req: 1 Potato Patch", {item: items.tool1, amount: 1}));

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
        jobs.addJob(new BuilderJob(game, "builder1", "Primitive Builder", 10, 1, () => techs.build1.unlocked, () => Infinity, "Builds basic structures, 1 work per tick"));
        jobs.addJob(new BuilderJob(game, "builder2", "Basic Builder", 10, 5, () => techs.builder2.unlocked, () => jobs.jobs.builder2.workersAssigned + items.tool2.amount, "Builds basic structures, 5 work per tick, Cost: 1 basic tool", {item: items.tool2, amount: 1}));

        // Production Jobs
        //  - Intermediate
        jobs.addJob(new CraftingJob(game, "craftTwine1", "Twine Maker", 10, 2, recipes.twine1, () => techs.twine1.unlocked, () => Infinity, "Crafts 4 fiber -> 1 twine"));
        jobs.addJob(new CraftingJob(game, "craftCloth1", "Weaver", 10, 1, recipes.cloth1, () => techs.weaving1.unlocked, () => jobs.jobs.craftCloth1.workersAssigned + items.tool1.amount, "Crafts 8 fiber -> 1 cloth, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new CraftingJob(game, "craftPlanks1", "Carpenter", 10, 2, recipes.planks1, () => techs.planks1.unlocked, () => jobs.jobs.craftPlanks1.workersAssigned + items.tool1.amount, "Crafts 1 log -> 4 planks, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new CraftingJob(game, "craftComposite1", "Composite Shaper", 10, 4, recipes.composite1, () => techs.composite1.unlocked, () => jobs.jobs.craftBricks1.workersAssigned + items.tool1.amount, "Crafts 2 mud + 2 clay -> 1 brick composite, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new CraftingJob(game, "craftBricks1", "Brickmaker", 10, 2, recipes.brick1, () => techs.bricks1.unlocked, () => buildings.kiln1.amount, "Crafts 10 sticks + 2 brick composite -> 1 brick, Req: 1 basic kiln"));
        //  - Tools
        jobs.addJob(new CraftingJob(game, "craftTool1", "Primitive Toolmaker", 10, 1, recipes.tool1, () => techs.tools1.unlocked, () => Infinity, "Crafts 4 rocks -> 1 primitive tool"));
        jobs.addJob(new CraftingJob(game, "craftTool2", "Basic Toolmaker", 10, 1, recipes.tool2, () => techs.tools2.unlocked, () => jobs.jobs.craftTool2.workersAssigned + items.tool1.amount, "Crafts 2 primitive tools + 4 twine -> 1 basic tool, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new CraftingJob(game, "craftBasket1", "Basket Weaver", 10, 1, recipes.basket1, () => techs.baskets1.unlocked, () => jobs.jobs.craftBasket1.workersAssigned + items.tool1.amount, "Crafts 1 cloth + 4 twine -> 1 basket, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new CraftingJob(game, "craftBucket1", "Bucketmaker", 10, 1, recipes.bucket1, () => techs.buckets1.unlocked, () => jobs.jobs.craftBucket1.workersAssigned + items.tool1.amount, "Crafts 2 planks -> 1 bucket, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        //  - Amenities
        jobs.addJob(new CraftingJob(game, "firemaker1", "Firemaker", 10, 1, recipes.campfire1, () => techs.fire1.unlocked, () => jobs.jobs.firemaker1.workersAssigned + items.tool1.amount, "Crafts 8 sticks + 4 twine -> 75% chance of 1 campfire, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new CraftingJob(game, "clothing1", "Clothier", 10, 1, recipes.clothing1, () => techs.clothing1.unlocked, () => Infinity, "Crafts 2 cloth -> 1 clothing"));
        //  - Food
        jobs.addJob(new CraftingJob(game, "craftFlour1", "Grinder", 10, 4, recipes.flour1, () => techs.flour1.unlocked, () => jobs.jobs.craftFlour1.workersAssigned + items.tool1.amount, "Crafts 2 wheat -> 2 flour, Cost: 1 primitive tool", {item: items.tool1, amount: 1}));
        jobs.addJob(new CraftingJob(game, "craftBread1", "Bread Maker", 10, 1, recipes.bread1, () => techs.bread1.unlocked, () => buildings.bakery1.amount, "Crafts 2 flour + 1 fresh water -> 1 bread, Req: 1 basic oven"));
        jobs.addJob(new CraftingJob(game, "craftFish1", "Fish Smoker", 10, 4, recipes.cookedFish1, () => techs.cooking1.unlocked && techs.fishing1.unlocked, () => jobs.jobs.craftFish1.workersAssigned + items.campfire.amount, "Crafts 1 fish -> 75 % chance of 1 cooked fish, Cost: 1 campfire", {item: items.campfire, amount: 1}));
        jobs.addJob(new CraftingJob(game, "craftMeat1", "Meat Smoker", 10, 4, recipes.cookedMeat1, () => techs.cooking1.unlocked && techs.hunting1.unlocked, () => jobs.jobs.craftMeat1.workersAssigned + items.campfire.amount, "Crafts 1 meat -> 75 % chance of 1 cooked meat, Cost: 1 campfire", {item: items.campfire, amount: 1}));
    }
}