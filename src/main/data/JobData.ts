import { ColonyCraft } from "../ColonyCraft";
import { Job } from "../content/colony/jobs/Job";
import { JobGroup } from "../content/colony/jobs/JobGroup";
import { JobManager } from "../content/colony/jobs/JobManager";
import { BuilderJob } from "../content/colony/jobs/custom/BuilderJob";
import { CraftingJob } from "../content/colony/jobs/custom/CraftingJob";
import { DevelopmentJob } from "../content/colony/jobs/custom/DevelopmentJob";
import { DiscoveryJob } from "../content/colony/jobs/custom/DiscoveryJob";
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
        //  - Basic
        jobs.addGroupWithJobs(new JobGroup(game, "basicGather", "Basic Gatherers", 0), [
            new ResourceJob(game, "forager", "Forager", 0, 8, tables.forager, () => true, () => Infinity, "Forages for materials and food"),
            new ResourceJob(game, "gatherer", "Gatherer", 0, 16, tables.gatherer, () => techs.gatherer1.unlocked, () => jobs.jobs.gatherer.workersAssigned + Math.floor(items.basket1.amount / 2), "Gathers materials and food, Cost: 2 basic baskets", {item: items.basket1, amount: 2}),
            new ResourceJob(game, "woodcutter", "Woodcutter", 0, 3, tables.woodcutter, () => techs.chopping1.unlocked, () => jobs.jobs.woodcutter.workersAssigned + items.tool1.amount, "Cuts trees, Cost: 1 primitive tool", {item: items.tool1, amount: 1}),
            new ResourceJob(game, "digger", "Digger", 0, 8, tables.digger, () => techs.digging1.unlocked, () => jobs.jobs.digger.workersAssigned + items.tool1.amount, "Digs for materials, Cost: 1 primitive tool", {item: items.tool1, amount: 1}),
            new ResourceJob(game, "water", "Water Gatherer", 0, 12, tables.water, () => techs.water1.unlocked, () => jobs.jobs.water.workersAssigned + Math.floor(items.bucket1.amount / 2), "Collects water, Cost: 2 wooden buckets", {item: items.bucket1, amount: 2}),
            new ResourceJob(game, "well", "Well Worker", 0, 20, tables.well, () => techs.water2.unlocked, () => buildings.well1.amount, "Operates a well, Req: 1 water well"),
        ]);
        //  - Food
        jobs.addGroupWithJobs(new JobGroup(game, "foodGather", "Food Gatherers", 10), [
            new ResourceJob(game, "fisher1", "Hand Fisher", 0, 10, tables.fish, () => techs.fishing1.unlocked, () => Infinity, "Catches fish"),
            new ResourceJob(game, "fisher2", "Spear Fisher", 0, 20, tables.fish, () => techs.fishing2.unlocked, () => jobs.jobs.fisher2.workersAssigned + items.tool2.amount, "Cost: 1 basic tool", {item: items.tool2, amount: 1}),
            new ResourceJob(game, "hunter1", "Endurance Hunter", 0, 10, tables.hunter, () => techs.hunting1.unlocked, () => Infinity, "Hunts for meat"),
            new ResourceJob(game, "hunter2", "Spear Hunter", 0, 20, tables.hunter, () => techs.hunting2.unlocked, () => jobs.jobs.hunter2.workersAssigned + items.tool2.amount, "Cost: 1 basic tool", {item: items.tool2, amount: 1}),
        ]);
        //  - Mining
        jobs.addGroupWithJobs(new JobGroup(game, "mining", "Mining", 20), [
            new ResourceJob(game, "coal1", "Surface Coal Miner", 0, 8, tables.coal1, () => techs.coal1.unlocked, () => Math.min(jobs.jobs.coal1.workersAssigned + Math.floor(items.tool2.amount / 2), Math.floor(game.colony.buildings.landMax / 20)), "Cost: 2 basic tools, Limit: 1 per 20 land", {item: items.tool2, amount: 2}),
            new ResourceJob(game, "copperOre1", "Surface Copper Miner", 0, 8, tables.copperOre1, () => techs.copperOre1.unlocked, () => Math.min(jobs.jobs.copperOre1.workersAssigned + Math.floor(items.tool2.amount / 2), Math.floor(game.colony.buildings.landMax / 20)), "Cost: 2 basic tools, Limit: 1 per 20 land", {item: items.tool2, amount: 2}),
            new ResourceJob(game, "tinOre1", "Surface Tin Miner", 0, 8, tables.tinOre1, () => techs.tinOre1.unlocked, () => Math.min(jobs.jobs.tinOre1.workersAssigned + Math.floor(items.tool2.amount / 2), Math.floor(game.colony.buildings.landMax / 20)), "Cost: 2 basic tools, Limit: 1 per 20 land", {item: items.tool2, amount: 2}),
        ]);

        // Farming Jobs
        jobs.addGroupWithJobs(new JobGroup(game, "farm", "Farming", 30), [
            new SeasonalResourceJob(game, "wheat1", "Wheat Gatherer", 0, [8, 16, 12, 0], tables.wheat, () => techs.wheat1.unlocked, () => Math.min(jobs.jobs.wheat1.workersAssigned + items.tool1.amount, buildings.wheat1.amount), "Cost: 1 primitive tool, Req: 1 Wheat Patch", {item: items.tool1, amount: 1}),
            new SeasonalResourceJob(game, "potato1", "Potato Gatherer", 0, [6, 10, 8, 4], tables.potato, () => techs.potato1.unlocked, () => Math.min(jobs.jobs.potato1.workersAssigned + items.tool1.amount, buildings.potato1.amount), "Cost: 1 primitive tool, Req: 1 Potato Patch", {item: items.tool1, amount: 1}),
        ]);

        // Exploration Jobs
        jobs.addGroupWithJobs(new JobGroup(game, "explore", "Exploration", 40), [
            new Job(game, "explorer1", "Scout", 10, () => techs.explore1.unlocked, () => Infinity, "Explores the surrounding area"),
        ]);

        // Production Jobs
        //  - Intermediate
        jobs.addGroupWithJobs(new JobGroup(game, "matCrafters", "Material Crafters", 50), [
            new CraftingJob(game, "craftTwine1", "Twine Maker", 10, 2, recipes.twine1, () => techs.twine1.unlocked, () => Infinity, "Crafts twine"),
            new CraftingJob(game, "craftCloth1", "Weaver", 10, 1, recipes.cloth1, () => techs.weaving1.unlocked, () => jobs.jobs.craftCloth1.workersAssigned + items.tool1.amount, "Crafts cloth, Cost: 1 primitive tool", {item: items.tool1, amount: 1}),
            new CraftingJob(game, "craftPlanks1", "Carpenter", 10, 2, recipes.planks1, () => techs.planks1.unlocked, () => jobs.jobs.craftPlanks1.workersAssigned + items.tool1.amount, "Crafts planks, Cost: 1 primitive tool", {item: items.tool1, amount: 1}),
            new CraftingJob(game, "craftComposite1", "Composite Shaper", 10, 4, recipes.composite1, () => techs.composite1.unlocked, () => jobs.jobs.craftBricks1.workersAssigned + items.tool1.amount, "Mixes brick composite, Cost: 1 primitive tool", {item: items.tool1, amount: 1}),
            new CraftingJob(game, "craftBricks1", "Brickmaker", 10, 2, recipes.brick1, () => techs.bricks1.unlocked, () => buildings.kiln1.amount, "Fires brick, Req: 1 basic kiln"),
        ]);
        //  - Metallurgy
        jobs.addGroupWithJobs(new JobGroup(game, "metalCrafters", "Metalworkers", 60), [
            new CraftingJob(game, "craftCopper1", "Copper Smelter", 10, 10, recipes.copper1, () => techs.copper1.unlocked, () => Math.min(jobs.jobs.craftCopper1.workersAssigned + Math.floor(items.tool2.amount / 5), buildings.copper1.amount), "Smelts copper, Cost: 5 basic tools", {item: items.tool2, amount: 5}),
            new CraftingJob(game, "craftTin1", "Tin Smelter", 10, 10, recipes.tin1, () => techs.tin1.unlocked, () => Math.min(jobs.jobs.craftTin1.workersAssigned + Math.floor(items.tool2.amount / 5), buildings.tin1.amount), "Smelts tin, Cost: 5 basic tools", {item: items.tool2, amount: 5}),
            new CraftingJob(game, "craftBronze1", "Bronze Alloyer", 10, 5, recipes.bronze1, () => techs.bronze1.unlocked, () => Math.min(jobs.jobs.craftBronze1.workersAssigned + Math.floor(items.tool3.amount / 5), buildings.bronze1.amount), "Alloys bronze, Cost: 5 basic metal tools", {item: items.tool3, amount: 5}),
        ]);
        //  - Tools
        jobs.addGroupWithJobs(new JobGroup(game, "toolCrafters", "Tool Crafters", 70), [
            new CraftingJob(game, "craftTool1", "Primitive Toolmaker", 10, 3, recipes.tool1, () => techs.tools1.unlocked, () => Infinity, "Crafts primitive tools"),
            new CraftingJob(game, "craftTool2", "Basic Toolmaker", 10, 2, recipes.tool2, () => techs.tools2.unlocked, () => jobs.jobs.craftTool2.workersAssigned + items.tool1.amount, "Crafts basic tools, Cost: 1 primitive tool", {item: items.tool1, amount: 1}),
            new CraftingJob(game, "craftTool3c", "Copper Toolsmith", 10, 1, recipes.tool3c, () => techs.tools3.unlocked, () => jobs.jobs.craftTool3c.workersAssigned + items.tool2.amount, "Crafts basic metal tools from copper, Cost: 1 basic tool", {item: items.tool2, amount: 1}),
            new CraftingJob(game, "craftTool3t", "Tin Toolsmith", 10, 1, recipes.tool3t, () => techs.tools3.unlocked, () => jobs.jobs.craftTool3t.workersAssigned + items.tool2.amount, "Crafts basic metal tools from tin, Cost: 1 basic tool", {item: items.tool2, amount: 1}),
            new CraftingJob(game, "craftBasket1", "Basket Weaver", 10, 1, recipes.basket1, () => techs.baskets1.unlocked, () => jobs.jobs.craftBasket1.workersAssigned + items.tool1.amount, "Crafts baskets, Cost: 1 primitive tool", {item: items.tool1, amount: 1}),
            new CraftingJob(game, "craftBucket1", "Bucketmaker", 10, 1, recipes.bucket1, () => techs.buckets1.unlocked, () => jobs.jobs.craftBucket1.workersAssigned + items.tool1.amount, "Crafts buckets, Cost: 1 primitive tool", {item: items.tool1, amount: 1}),
        ]);
        //  - Food
        jobs.addGroupWithJobs(new JobGroup(game, "foodCrafters", "Food Crafters", 80), [
            new CraftingJob(game, "craftFlour1", "Grinder", 10, 4, recipes.flour1, () => techs.flour1.unlocked, () => jobs.jobs.craftFlour1.workersAssigned + items.tool1.amount, "Grinds flour, Cost: 1 primitive tool", {item: items.tool1, amount: 1}),
            new CraftingJob(game, "craftBread1", "Bread Maker", 10, 1, recipes.bread1, () => techs.bread1.unlocked, () => buildings.bakery1.amount, "Bakes bread, Req: 1 basic oven"),
            new CraftingJob(game, "craftFish1", "Fish Smoker", 10, 4, recipes.cookedFish1, () => techs.cooking1.unlocked && techs.fishing1.unlocked, () => jobs.jobs.craftFish1.workersAssigned + items.campfire.amount, "Smokes cooked fish, Cost: 1 campfire", {item: items.campfire, amount: 1}),
            new CraftingJob(game, "craftMeat1", "Meat Smoker", 10, 4, recipes.cookedMeat1, () => techs.cooking1.unlocked && techs.hunting1.unlocked, () => jobs.jobs.craftMeat1.workersAssigned + items.campfire.amount, "Smokes cooked meat, Cost: 1 campfire", {item: items.campfire, amount: 1}),
        ]);
        //  - Amenities
        jobs.addGroupWithJobs(new JobGroup(game, "amenityCrafters", "Amenity Crafters", 90), [
            new CraftingJob(game, "firemaker1", "Firemaker", 10, 1, recipes.campfire1, () => techs.fire1.unlocked, () => jobs.jobs.firemaker1.workersAssigned + items.tool1.amount, "Starts campfires, Cost: 1 primitive tool", {item: items.tool1, amount: 1}),
            new CraftingJob(game, "clothing1", "Clothier", 10, 1, recipes.clothing1, () => techs.clothing1.unlocked, () => Infinity, "Weaves clothing"),
        ]);

        // Building Jobs
        jobs.addGroupWithJobs(new JobGroup(game, "build", "Construction", 100), [
            new BuilderJob(game, "builder1", "Primitive Builder", 10, 1, () => techs.build1.unlocked, () => Infinity, "Builds structures"),
            new BuilderJob(game, "builder2", "Basic Builder", 10, 5, () => techs.builder2.unlocked, () => jobs.jobs.builder2.workersAssigned + items.tool2.amount, "Builds structures, Cost: 1 basic tool", {item: items.tool2, amount: 1}),
        ]);

        // Discovery Jobs
        jobs.addGroupWithJobs(new JobGroup(game, "discover", "Discovery", 110), [
            new DiscoveryJob(game, "invention1", "Thinker", 20, 1, "invention", () => true, () => Math.floor(game.colony.population.adults / 6), "Generates Invention Discoveries, Limit: 1 per 6 Workers"),
            new DiscoveryJob(game, "math1", "Counter", 20, 1, "math", () => techs.math1.unlocked, () => Math.floor(game.colony.population.adults / 8), "Generates Math Discoveries, Limit: 1 per 8 Workers"),
            new DiscoveryJob(game, "physics1", "Motion Tester", 20, 1, "physics", () => techs.physics1.unlocked, () => Math.floor(game.colony.population.adults / 10), "Generates Physics Discoveries, Limit: 1 per 10 Workers"),
            new DiscoveryJob(game, "chemistry1", "Rock Observer", 20, 1, "chemistry", () => techs.chemistry1.unlocked, () => Math.floor(game.colony.population.adults / 10), "Generates Chemistry Discoveries, Limit: 1 per 10 Workers"),
            new DiscoveryJob(game, "biology1", "Biologist", 20, 1, "biology", () => false, () => Math.floor(game.colony.population.adults / 10), "Generates Biology Discoveries, Limit: 1 per 10 Workers"),
            new DiscoveryJob(game, "quantum1", "Quantum Scientist", 20, 1, "quantum", () => false, () => Math.floor(game.colony.population.adults / 12), "Generates Quantum Discoveries, Limit: 1 per 12 Workers"),
        ]);

        // Development Jobs
        jobs.addGroupWithJobs(new JobGroup(game, "development", "Development", 120), [
            new DevelopmentJob(game, "culture1", "Carver", 20, 1, "c", () => techs.culture1.unlocked, () => jobs.jobs.culture1.workersAssigned + items.tool1.amount, "Generates Cultural Developments, Costs: 1 primitive tool", {item: items.tool1, amount: 1}),
            new DevelopmentJob(game, "politic1", "Politician", 20, 1, "p", () => false, () => Infinity, "Generates Political Developments"),
            new DevelopmentJob(game, "religion1", "Cleric", 20, 1, "r", () => false, () => Infinity, "Generates Religious Developments"),
        ]);
    }
}