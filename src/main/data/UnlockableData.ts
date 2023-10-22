import { ColonyCraft } from "../ColonyCraft";
import { ResearchManager } from "../content/colony/research/ResearchManager";
import { TechPoints } from "../content/colony/research/TechPoints";
import { Technology } from "../content/colony/research/Technology";
import { Trait } from "../content/colony/traits/Trait";
import { TraitManager } from "../content/colony/traits/TraitManager";
import { WelfareTrait } from "../content/colony/traits/custom/WelfareTrait";

export class UnlockableData {
    public static addUnlockables (game: ColonyCraft, research: ResearchManager, development: TraitManager) {
        // Main Tech Line
        research.registerTechnology(new Technology(game, "math1", "Basic Mathematics", new TechPoints(100), ["Unlocks the Counter Job", "", '"1 + 1 = 2"'], ["survival1", "crafting1"]));
        research.registerTechnology(new Technology(game, "math2", "Intermediate Mathematics", new TechPoints(500, 300), ['"5 x 5 = 25"'], ["math1"]));

        // 'Core' Techs
        research.registerTechnology(new Technology(game, "survival1", "Basic Survivalibility", new TechPoints(25), ['"The act of not dying"']));
        research.registerTechnology(new Technology(game, "survival2", "Intermediate Survivalibility", new TechPoints(100), ['"The idea that there is a future"'], ["survival1"]));
        research.registerTechnology(new Technology(game, "crafting1", "Basic Crafting", new TechPoints(25), ["Unlocks Crafting Jobs", "New recipes will unlock a new job that crafts it", "", '"Combine stick with stick to make big stick"']));
        research.registerTechnology(new Technology(game, "build1", "Basic Construction", new TechPoints(40), ["Unlocks the Builder Job", "Unlocks the building menu", "", '"The idea that some things are more stable than others"'], ["crafting1", "survival1"]));
        research.registerTechnology(new Technology(game, "build2", "Intermediate Construction", new TechPoints(100, 50), ["Allows the building of more sturdy buildings", "", '"W A L L"'], ["math1", "build1", "planks1"]));

        // Exploration Tech Line
        research.registerTechnology(new Technology(game, "explore1", "Exploration", new TechPoints(30), ["Unlocks the Scout Job", "", '"Exploring the area around us"'], ["survival1"]));

        // Gathering Tech Line
        research.registerTechnology(new Technology(game, "chopping1", "Woodcutting", new TechPoints(50), ["Unlocks the Woodcutter Job", "", '"Axe go chop chop"'], ["tools1", "survival1"]));
        research.registerTechnology(new Technology(game, "digging1", "Digging", new TechPoints(50), ["Unlocks the Digger Job", "", '"Diggy diggy hole"'], ["tools1", "survival1"]));

        // Production Tech Line
        research.registerTechnology(new Technology(game, "twine1", "Plant Twine", new TechPoints(30), ["Unlocks the Plant Twine Recipe", "(Crafts 4 fibre -> 1 twine)", "", '"Roll grass make rope"'], ["crafting1", "survival1"]));
        research.registerTechnology(new Technology(game, "fire1", "Firemaking", new TechPoints(50), ["Unlocks the Firemaker Job", "(Crafts 8 sticks + 4 twine -> 75% chance of 1 campfire)", "", '"Big hot burny stuff"'], ["tools1", "twine1"]));
        research.registerTechnology(new Technology(game, "tools1", "Stone Knapping", new TechPoints(50), ["Unlocks the Stone Knapping Recipe", "(Crafts 4 rocks -> 1 primitive tool)", "", '"Make rock into sharp rock"'], ["crafting1", "survival1"]));
        research.registerTechnology(new Technology(game, "tools2", "Toolmaking", new TechPoints(125, 50), ["Unlocks the Basic Tools Recipe", "(Crafts 2 primitive tools + 4 twine -> 1 basic tool)", "", '"Putting together some rocks and sticks"'], ["tools1", "math1", "twine1"]));
        research.registerTechnology(new Technology(game, "planks1", "Basic Carpentry", new TechPoints(75), ["Unlocks the Planks Recipe", "(Crafts 1 log -> 4 planks)", "", '"It\'s easier to build with flat slabs of wood than with thick logs"'], ["chopping1", "build1"]));
        research.registerTechnology(new Technology(game, "composite1", "Clay/Mud Working", new TechPoints(75), ["Unlocks the Brick Composite Recipe", "(Crafts 2 mud + 2 clay -> 1 brick composite)", "", '"Clay and mud is very soft and easy to work with"'], ["digging1"]));
        research.registerTechnology(new Technology(game, "bricks1", "Brick Firing", new TechPoints(100), ["Unlocks the Brick Recipe", "(Crafts 2 brick composite -> 1 brick)", "", '"Bricks are a very sturdy building material"'], ["composite1", "kiln1"]));

        // Construction Tech Line
        research.registerTechnology(new Technology(game, "storage1", "Stockpiling", new TechPoints(50), ["Unlocks the Storage Pit Building", "Unlocks the storage menu", "", '"Put stuff in hole"'], ["build1"]));
        research.registerTechnology(new Technology(game, "storage2", "Storage Hut", new TechPoints(125, 50), ["Unlocks the Storage Hut Building", "", '"Put stuff in house"'], ["storage1", "build2"]));
        research.registerTechnology(new Technology(game, "kiln1", "Basic Kiln", new TechPoints(100), ["Unlocks the Basic Kiln Building", "", '"Hardening things using fire"'], ["composite1", "fire1", "build1"]));

        // Social Traits
        development.registerTrait(new WelfareTrait(game, "hope", "Hope", "s", 100, 0, 1, ["Belief in the future", "+0.1% base morale per tick"], ["survival2", "fire1"]));
    }
}