import { ColonyCraft } from "../ColonyCraft";
import { ResearchManager } from "../content/colony/research/ResearchManager";
import { TechPoints } from "../content/colony/research/TechPoints";
import { Technology } from "../content/colony/research/Technology";
import { Trait } from "../content/colony/traits/Trait";
import { TraitManager } from "../content/colony/traits/TraitManager";
import { WelfareTrait } from "../content/colony/traits/custom/WelfareTrait";

export class UnlockableData {
    public static addUnlockables (game: ColonyCraft, research: ResearchManager, development: TraitManager) {
        // Discovery Tech Line
        research.registerTechnology(new Technology(game, "math1", "Basic Mathematics", new TechPoints(300), ["Unlocks the Counter Job", "", '"1 + 1 = 2"'], ["survival1", "crafting1"], "progress"));
        research.registerTechnology(new Technology(game, "math2", "Intermediate Mathematics", new TechPoints(1000, 400), ['"5 x 5 = 25"'], ["math1"], "progress"));
        research.registerTechnology(new Technology(game, "physics1", "Motion Observation", new TechPoints(1500, 600), ["Unlocks the Crash Tester Job", "", '"Crashing things into each other produced similar results"'], ["math2", "tools2"], "progress"));
        research.registerTechnology(new Technology(game, "chemistry1", "Material Observation", new TechPoints(1500, 600), ["Unlocks the Rock Observer Job", "", '"When 2 hard things don\'t sound the same, something is wrong"'], ["math1", "tools2", "bricks1"], "progress"));

        // Trait Tech Line
        research.registerTechnology(new Technology(game, "culture1", "Carving", new TechPoints(200), ["Unlocks the Carver Job", "", '"Carving wood into shapes"'], ["tools1", "chopping1"], "progress"));

        // 'Core' Techs
        research.registerTechnology(new Technology(game, "survival1", "Basic Survivalibility", new TechPoints(50), ['"The act of not dying"'], [], "progress"));
        research.registerTechnology(new Technology(game, "crafting1", "Basic Crafting", new TechPoints(50), ["Unlocks Crafting Jobs", "New recipes will unlock a new job that crafts it", "", '"Combine stick with stick to make big stick"'], [], "progress"));
        research.registerTechnology(new Technology(game, "build1", "Basic Construction", new TechPoints(150), ["Unlocks the Builder Job", "", '"The idea that some things are more stable than others"'], ["crafting1", "survival1"], "progress"));
        research.registerTechnology(new Technology(game, "build2", "Intermediate Construction", new TechPoints(500, 300, 200), ["Allows the building of more sturdy buildings", "", '"W A L L"'], ["physics1", "build1", "planks1"]));
        research.registerTechnology(new Technology(game, "farming1", "Basic Farming", new TechPoints(500, 250), ["Unlocks Farming Buildings and Jobs", "New crops will unlock a new job and building", "", '"A sustainable source of food"'], ["tools1", "survival1", "math1"], "food"));

        // Exploration Tech Line
        research.registerTechnology(new Technology(game, "explore1", "Exploration", new TechPoints(100), ["Unlocks the Scout Job", "", '"Exploring the area around us"'], ["survival1"], "progress"));

        // Gathering Tech Line
        research.registerTechnology(new Technology(game, "gatherer1", "Gathering", new TechPoints(300, 150), ["Unlocks the Gatherer Job", "Gathers twice as fast as foragers, but cannot gather water", "", '"Foragers with baskets can hold a whole lot more"'], ["baskets1", "survival1", "math1"]));
        research.registerTechnology(new Technology(game, "chopping1", "Woodcutting", new TechPoints(150), ["Unlocks the Woodcutter Job", "", '"Axe go chop chop"'], ["tools1", "survival1"], "progress"));
        research.registerTechnology(new Technology(game, "digging1", "Digging", new TechPoints(150), ["Unlocks the Digger Job", "", '"Diggy diggy hole"'], ["tools1", "survival1"], "progress"));
        research.registerTechnology(new Technology(game, "fishing1", "Hand Fishing", new TechPoints(200), ["Unlocks the Fisher Job", "Consistent, but less rewarding than hunting", "", '"Much harder to catch than it seems"'], ["explore1"], "food"));
        research.registerTechnology(new Technology(game, "fishing2", "Spear Fishing", new TechPoints(500, 250), ["Unlocks the Spear Fisher Job", "", '"A much more effective way of catching fish"'], ["fishing1", "tools2", "math1"], "food"));
        research.registerTechnology(new Technology(game, "hunting1", "Endurance Hunting", new TechPoints(300), ["Unlocks the Hunter Job", "Risky, but more rewarding than fishing", "", '"Hunting animals for food"'], ["explore1"], "food"));
        research.registerTechnology(new Technology(game, "hunting2", "Spear Hunting", new TechPoints(800, 400), ["Unlocks the Spear Hunter Job", "", '"A much more effective way of hunting"'], ["hunting1", "tools2", "math1"], "food"));
        research.registerTechnology(new Technology(game, "water1", "Water Gathering", new TechPoints(300), ["Unlocks the Water Gatherer Job", "", '"By training foragers to use buckets, they can collect more water"'], ["buckets1", "explore1"]));

        // Cooking Tech Line
        research.registerTechnology(new Technology(game, "cooking1", "Cooking", new TechPoints(200), ["Unlocks the Cooking Jobs", "", '"Cooking food makes it taste better"'], ["survival1", "fire1"], "food"));

        // Farming Tech Line
        research.registerTechnology(new Technology(game, "wheat1", "Wheat Farming", new TechPoints(600, 300), ["Unlocks the Wheat Crop", "Grows fast, but not in the winter or spring", "", '"Tastes bad 0/10 wouldn\'t reccommend"'], ["farming1"], "food"));
        research.registerTechnology(new Technology(game, "potato1", "Potato Farming", new TechPoints(600, 300), ["Unlocks the Potato Crop", "Grows slow, but during the entire year", "", '"The perfect size to throw at people"'], ["farming1"], "food"));

        // Baking Tech Line
        research.registerTechnology(new Technology(game, "flour1", "Wheat Processing", new TechPoints(800, 400), ["Unlocks the Flour Recipe", "Crafts 2 wheat -> 2 flour", "", '"Can be used to make a vareity of foods"'], ["wheat1"], "food"));
        research.registerTechnology(new Technology(game, "bread1", "Bread", new TechPoints(1000, 500), ["Unlocks the Bread Recipe", "Crafts 2 flour + 1 fresh water -> 1 bread", "", '"A simple food made from flour and water"'], ["flour1", "water1", "bakery1"], "food"));

        // Mining Tech Line
        research.registerTechnology(new Technology(game, "mining1", "Surface Mining", new TechPoints(1000, 600, 0, 300), ["Unlocks the Miner Job", "", '"The realization that some rocks are more useful than others"'], ["tools2", "math2", "chemistry1"], "progress"));
        research.registerTechnology(new Technology(game, "copperOre1", "Surface Copper Ore", new TechPoints(1250, 800, 0, 500), ["Unlocks Copper Ore", "", '"A certain kind of harder rock"'], ["mining1"], "progress"));
        research.registerTechnology(new Technology(game, "tinOre1", "Surface Tin Ore", new TechPoints(1250, 800, 0, 500), ["Unlocks Tin Ore", "", '"Another kind of harder rock"'], ["mining1"], "progress"));

        // Metalworking Tech Line
        research.registerTechnology(new Technology(game, "smelting1", "Furnace", new TechPoints(1500, 1000, 0, 600), ["Unlocks the Furnace Building", "", '"Reaching higher temperatures than a simple fire"'], ["chemistry1"], "progress"));
        research.registerTechnology(new Technology(game, "copper1", "Copper Smelting", new TechPoints(1750, 1250, 0, 750), ["Unlocks the Copper Smelting Recipe", "Crafts 2 copper ore -> 1 copper", "", '"A stronger material than stone"'], ["smelting1", "copperOre1"], "progress"));
        research.registerTechnology(new Technology(game, "tin1", "Tin Smelting", new TechPoints(1750, 1250, 0, 750), ["Unlocks the Tin Smelting Recipe", "Crafts 2 tin ore -> 1 tin", "", '"A more useful material than stone"'], ["smelting1", "tinOre1"], "progress"));
        //research.registerTechnology(new Technology(game, "smelting2", "Crucible", new TechPoints(4000, 3000, 0, 2000), ["Unlocks the Crucible Building", "", '"An even higher temperature for fusing 2 metals"'], ["smelting1", "curiosity"], "progress"));
        //research.registerTechnology(new Technology(game, "bronze1", "Bronze Alloying", new TechPoints(5000, 4000, 0, 3000), ["Unlocks the Bronze Alloying Recipe", "Crafts 3 copper + 1 tin -> 2 bronze", "", '"A stronger material than copper"'], ["smelting2", "copper1", "tin1"], "progress"));

        // Tool Tech Line
        research.registerTechnology(new Technology(game, "tools1", "Stone Knapping", new TechPoints(150), ["Unlocks the Stone Knapping Recipe", "Crafts 4 rocks -> 1 primitive tool", "", '"Make rock into sharp rock"'], ["crafting1"], "progress"));
        research.registerTechnology(new Technology(game, "tools2", "Toolmaking", new TechPoints(400, 200), ["Unlocks the Basic Tools Recipe", "Crafts 2 primitive tools + 4 twine -> 1 basic tool", "", '"Putting together some rocks and sticks"'], ["tools1", "math1", "twine1"], "progress"));
        research.registerTechnology(new Technology(game, "tools3", "Basic Metal Tools", new TechPoints(2500, 1600, 1000, 1000), ["Unlocks the Basic Metal Tools Recipe", "Crafts 2 copper or 2 tin + 2 basic tools -> 1 basic metal tool", "", '"Putting together some metal and basic tools"'], ["tools2", "copper1", "tin1", "physics1"], "progress"));

        // Production Tech Line
        research.registerTechnology(new Technology(game, "twine1", "Plant Twine", new TechPoints(100), ["Unlocks the Plant Twine Recipe", "Crafts 4 fiber -> 1 twine", "", '"Roll grass make rope"'], ["crafting1"], "progress"));
        research.registerTechnology(new Technology(game, "planks1", "Basic Carpentry", new TechPoints(200), ["Unlocks the Planks Recipe", "Crafts 1 log -> 4 planks", "", '"It\'s easier to build with flat slabs of wood than with thick logs"'], ["chopping1", "build1"], "progress"));
        research.registerTechnology(new Technology(game, "buckets1", "Wooden Buckets", new TechPoints(250), ["Unlocks the Wooden Bucket Recipe", "Crafts 2 planks -> 1 bucket", "", '"Useful for carrying things"'], ["planks1"]));
        research.registerTechnology(new Technology(game, "composite1", "Clay/Mud Working", new TechPoints(200), ["Unlocks the Brick Composite Recipe", "Crafts 2 mud + 2 clay -> 1 brick composite", "", '"Clay and mud is very soft and easy to work with"'], ["digging1"], "progress"));
        research.registerTechnology(new Technology(game, "bricks1", "Brick Firing", new TechPoints(250), ["Unlocks the Brick Recipe", "Crafts 2 brick composite -> 1 brick", "", '"Bricks are a very sturdy building material"'], ["composite1", "kiln1"], "progress"));
        research.registerTechnology(new Technology(game, "weaving1", "Weaving", new TechPoints(200), ["Unlocks the Cloth Recipe", "Crafts 8 fiber -> 1 cloth", "", '"Cloth is a very flexible material made from fiber"'], ["twine1", "tools1"]));
        research.registerTechnology(new Technology(game, "baskets1", "Basket Weaving", new TechPoints(250), ["Unlocks the Basket Recipe", "1 cloth + Crafts 4 twine -> 1 basket", "", '"Baskets are useful for carrying things"'], ["weaving1"]));

        // Amenity Tech Line
        research.registerTechnology(new Technology(game, "fire1", "Firemaking", new TechPoints(150), ["Unlocks the Firemaker Job", "Crafts 8 sticks + 4 twine -> 75% chance of 1 campfire", "", '"Big hot burny stuff"'], ["tools1", "twine1"], "progress"));
        research.registerTechnology(new Technology(game, "clothing1", "Primitive Clothing", new TechPoints(300), ["Unlocks the Primitive Clothing Recipe", "Crafts 2 cloth -> 1 clothing", "", '"Provides warmth and protection"'], ["weaving1"]));

        // Construction Tech Line
        research.registerTechnology(new Technology(game, "storage1", "Stockpiling", new TechPoints(150, 100), ["Unlocks the Storage Pit Building", "Unlocks precise inventory", "", '"Put stuff in hole"'], ["build1", "math1"], "progress"));
        research.registerTechnology(new Technology(game, "storage2", "Storage Hut", new TechPoints(500, 300, 200), ["Unlocks the Storage Hut Building", "", '"Put stuff in house"'], ["storage1", "build2"]));
        research.registerTechnology(new Technology(game, "kiln1", "Basic Kiln", new TechPoints(300), ["Unlocks the Basic Kiln Building", "", '"Hardening things using fire"'], ["composite1", "fire1", "build1"], "progress"));
        research.registerTechnology(new Technology(game, "bakery1", "Baking", new TechPoints(300), ["Unlocks the Basic Oven Building", "", '"Bread."'], ["composite1", "cooking1", "build1"], "food"));
        research.registerTechnology(new Technology(game, "builder2", "Better Builders", new TechPoints(600, 400, 200), ["Unlocks another Builder Job", "", '"Tools make building a whole lot easier"'], ["tools2", "build2"]));

        // Social Traits
        development.registerTrait(new WelfareTrait(game, "acceptance", "Acceptance", "s", 500, 0, 1, ["Acceptance of this dire situation", "+0.1% base morale per tick"], ["survival1"]));
        development.registerTrait(new WelfareTrait(game, "community", "Community", "s", 1250, 0, 1, ["Supporting each other", "+0.1% base morale per tick"], ["fire1", "clothing1", "acceptance"]));
        development.registerTrait(new WelfareTrait(game, "hope", "Hope", "s", 2500, 0, 2, ["Belief in the future", "+0.2% base morale per tick"], ["farming1", "water1", "community"]));
        development.registerTrait(new Trait(game, "curiosity", "Curiosity", "s", 5000, ["A yearning for knowledge", "Unlocks more discoveries"], ["hope", "chemistry1", "physics1"]));

        // Cultural Traits
        development.registerTrait(new WelfareTrait(game, "art", "Artistry", "c", 750, 0, 1, ["Creating visually pleasing things", "+0.1% base morale per tick"], ["culture1"]));
        development.registerTrait(new WelfareTrait(game, "decor", "Decoration", "c", 1500, 0, 1, ["Placing nice things around common areas", "+0.1% base morale per tick"], ["art", "community"]));
        development.registerTrait(new WelfareTrait(game, "intricacy", "Intricacy", "c", 3500, 0, 2, ["Paying attention to fine details and intricacies", "+0.2% base morale per tick"], ["decor", "hope"]));

        // Other Unlockables
        research.registerTechnology(new Technology(game, "test8", "???", new TechPoints(99999, 99999, 99999, 99999), ['"Does... something?"'], ["physics1", "chemistry1"]));
    }
}