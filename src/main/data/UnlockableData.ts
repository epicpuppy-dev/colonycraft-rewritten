import { ColonyCraft } from "../ColonyCraft";
import { TechPoints } from "../content/colony/research/TechPoints";
import { Technology } from "../content/colony/research/Technology";
import { Trait } from "../content/colony/traits/Trait";

export class UnlockableData {
    public static addUnlockables (game: ColonyCraft) {
        const traits = game.colony.traits;
        const technologies = game.colony.research;

        technologies.registerTechnology(new Technology("test", "Test", new TechPoints(20), ["Unlocks test"]));
        technologies.registerTechnology(new Technology("testa", "Test A", new TechPoints(15), ["Unlocks another test", "line 2"]));
        technologies.registerTechnology(new Technology("testb", "Test B", new TechPoints(1111, 1111, 1111, 1111, 1111, 1111), ["yahoooooooooooooo"]));
        technologies.registerTechnology(new Technology("test2", "Test 2", new TechPoints(40, 20), [], [technologies.technologies.test]));
        technologies.registerTechnology(new Technology("test2a", "Test 2a", new TechPoints(30, 15), [], [technologies.technologies.test]))
        technologies.registerTechnology(new Technology("test3", "Test 3", new TechPoints(60, 40, 20), [], [technologies.technologies.test2]));
        technologies.registerTechnology(new Technology("test4", "Test 4", new TechPoints(80, 60, 40, 20), [], [technologies.technologies.test3]));
        technologies.registerTechnology(new Technology("test5", "Test 5", new TechPoints(100, 80, 60, 40, 20), [], [technologies.technologies.test4]));
        technologies.registerTechnology(new Technology("test6", "Test 6", new TechPoints(120, 100, 80, 60, 40, 20), [], [technologies.technologies.test5]));

        traits.registerTrait(new Trait("tests1", "Test S1", "s", 20, [], [game.colony.research.technologies.test]));
        traits.registerTrait(new Trait("tests2", "Test S2", "s", 50, [], [traits.traits.tests1]));
        traits.registerTrait(new Trait("tests3a", "Test S3a", "s", 100, [], [traits.traits.tests2]));
        traits.registerTrait(new Trait("tests3b", "Test S3b", "s", 100, [], [traits.traits.tests2]));
        traits.registerTrait(new Trait("tests4", "Test S4", "s", 200, [], [traits.traits.tests3a, traits.traits.tests3b]));

        traits.registerTrait(new Trait("testc1", "Test C1", "c", 20, ["- a", "- b", "- c"]));
        traits.registerTrait(new Trait("testc2", "Test C2", "c", 50, [], [traits.traits.testc1]));
        traits.registerTrait(new Trait("testc3a", "Test C3a", "c", 100, [], [traits.traits.testc2]));
        traits.registerTrait(new Trait("testc3b", "Test C3b", "c", 100, [], [traits.traits.testc2]));
        traits.registerTrait(new Trait("testc4", "Test C4", "c", 200, [], [traits.traits.testc3a, traits.traits.testc3b]));

        traits.registerTrait(new Trait("testp1", "Test P1", "p", 20));
        traits.registerTrait(new Trait("testp2", "Test P2", "p", 50, [], [traits.traits.testp1]));
        traits.registerTrait(new Trait("testp3a", "Test P3a", "p", 100, [], [traits.traits.testp2]));
        traits.registerTrait(new Trait("testp3b", "Test P3b", "p", 100, [], [traits.traits.testp2]));
        traits.registerTrait(new Trait("testp4", "Test P4", "p", 200, [], [traits.traits.testp3a, traits.traits.testp3b]));
        
        traits.registerTrait(new Trait("testr1", "Test R1", "r", 20));
        traits.registerTrait(new Trait("testr2", "Test R2", "r", 50, [], [traits.traits.testr1]));
        traits.registerTrait(new Trait("testr3a", "Test R3a", "r", 100, [], [traits.traits.testr2]));
        traits.registerTrait(new Trait("testr3b", "Test R3b", "r", 100, [], [traits.traits.testr2]));
        traits.registerTrait(new Trait("testr4", "Test R4", "r", 200, [], [traits.traits.testr3a, traits.traits.testr3b]));
    }
}