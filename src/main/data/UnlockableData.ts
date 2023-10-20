import { ColonyCraft } from "../ColonyCraft";
import { TechPoints } from "../content/colony/research/TechPoints";
import { Technology } from "../content/colony/research/Technology";
import { Trait } from "../content/colony/traits/Trait";

export class UnlockableData {
    public static addUnlockables (game: ColonyCraft) {
        const traits = game.colony.traits;
        const technologies = game.colony.research;

        technologies.registerTechnology(new Technology(game, "test", "Test", new TechPoints(20), ["Unlocks test"]));
        technologies.registerTechnology(new Technology(game, "testa", "Test A", new TechPoints(15), ["Unlocks another test", "line 2"]));
        technologies.registerTechnology(new Technology(game, "testb", "Test B", new TechPoints(1111, 1111, 1111, 1111, 1111, 1111), ["yahoooooooooooooo"]));
        technologies.registerTechnology(new Technology(game, "test2", "Test 2", new TechPoints(40, 20), [], [technologies.technologies.test]));
        technologies.registerTechnology(new Technology(game, "test2a", "Test 2a", new TechPoints(30, 15), [], [technologies.technologies.test]))
        technologies.registerTechnology(new Technology(game, "test3", "Test 3", new TechPoints(60, 40, 20), [], [technologies.technologies.test2]));
        technologies.registerTechnology(new Technology(game, "test4", "Test 4", new TechPoints(80, 60, 40, 20), [], [technologies.technologies.test3]));
        technologies.registerTechnology(new Technology(game, "test5", "Test 5", new TechPoints(100, 80, 60, 40, 20), [], [technologies.technologies.test4]));
        technologies.registerTechnology(new Technology(game, "test6", "Test 6", new TechPoints(120, 100, 80, 60, 40, 20), [], [technologies.technologies.test5]));
        technologies.registerTechnology(new Technology(game, "test7", "Test 7", new TechPoints(10, 10, 10, 10, 10, 10), ["test"], []));
        technologies.registerTechnology(new Technology(game, "test8", "Test 8", new TechPoints(10, 10, 10, 10, 10, 10), ["test"], []));
        technologies.registerTechnology(new Technology(game, "test9", "Test 9", new TechPoints(10, 10, 10, 10, 10, 10), ["test"], []));
        technologies.registerTechnology(new Technology(game, "test10", "Test 10", new TechPoints(10, 10, 10, 10, 10, 10), ["test"], []));
        technologies.registerTechnology(new Technology(game, "test11", "Test 11", new TechPoints(10, 10, 10, 10, 10, 10), ["test"], []));
        technologies.registerTechnology(new Technology(game, "test12", "Test 12", new TechPoints(10, 10, 10, 10, 10, 10), ["test"], []));
        technologies.registerTechnology(new Technology(game, "test13", "Test 13", new TechPoints(10, 10, 10, 10, 10, 10), ["test"], []));
        technologies.registerTechnology(new Technology(game, "test14", "Test 14", new TechPoints(10, 10, 10, 10, 10, 10), ["test"], []));
        technologies.registerTechnology(new Technology(game, "test15", "Test 15", new TechPoints(10, 10, 10, 10, 10, 10), ["test"], []));
        technologies.registerTechnology(new Technology(game, "test16", "Test 16", new TechPoints(10, 10, 10, 10, 10, 10), ["test"], []));

        /*
        traits.registerTrait(new Trait("tests1", "Test S1", "s", 20, [], []));
        traits.registerTrait(new Trait("tests2", "Test S2", "s", 50, [], [traits.traits.tests1]));
        traits.registerTrait(new Trait("tests3a", "Test S3a", "s", 100, [], [traits.traits.tests2]));
        traits.registerTrait(new Trait("tests3b", "Test S3b", "s", 100, [], [traits.traits.tests2]));
        traits.registerTrait(new Trait("tests4", "Test S4", "s", 200, [], [traits.traits.tests3a, traits.traits.tests3b]));
        */
        traits.registerTrait(new Trait(game, "tests1", "Test S1", "s", 1, ["1", "2", "3", "4"], []));
        traits.registerTrait(new Trait(game, "tests2", "Test S2", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests3", "Test S3", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests4", "Test S4", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests5", "Test S5", "s", 1, ["1", "2", "3", "4"], []));
        traits.registerTrait(new Trait(game, "tests6", "Test S6", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests7", "Test S7", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests8", "Test S8", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests9", "Test S9", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests10", "Test S10", "s", 1, ["1", "2", "3", "4"], []));
        traits.registerTrait(new Trait(game, "tests11", "Test S11", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests12", "Test S12", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests13", "Test S13", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests14", "Test S14", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests15", "Test S15", "s", 1, ["1", "2", "3", "4"], []));
        traits.registerTrait(new Trait(game, "tests16", "Test S16", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests17", "Test S17", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests18", "Test S18", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests19", "Test S19", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests20", "Test S20", "s", 1, ["1", "2", "3", "4"], []));
        traits.registerTrait(new Trait(game, "tests21", "Test S21", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests22", "Test S22", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests23", "Test S23", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests24", "Test S24", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests25", "Test S25", "s", 1, ["1", "2", "3", "4"], []));
        traits.registerTrait(new Trait(game, "tests26", "Test S26", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests27", "Test S27", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests28", "Test S28", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests29", "Test S29", "s", 1, [], []));
        traits.registerTrait(new Trait(game, "tests30", "Test S30", "s", 1, ["1", "2", "3", "4"], []));

        traits.registerTrait(new Trait(game, "testc1", "Test C1", "c", 20, ["- a", "- b", "- c"]));
        traits.registerTrait(new Trait(game, "testc2", "Test C2", "c", 50, [], [traits.traits.testc1]));
        traits.registerTrait(new Trait(game, "testc3a", "Test C3a", "c", 100, [], [traits.traits.testc2]));
        traits.registerTrait(new Trait(game, "testc3b", "Test C3b", "c", 100, [], [traits.traits.testc2]));
        traits.registerTrait(new Trait(game, "testc4", "Test C4", "c", 200, [], [traits.traits.testc3a, traits.traits.testc3b]));

        traits.registerTrait(new Trait(game, "testp1", "Test P1", "p", 20));
        traits.registerTrait(new Trait(game, "testp2", "Test P2", "p", 50, [], [traits.traits.testp1]));
        traits.registerTrait(new Trait(game, "testp3a", "Test P3a", "p", 100, [], [traits.traits.testp2]));
        traits.registerTrait(new Trait(game, "testp3b", "Test P3b", "p", 100, [], [traits.traits.testp2]));
        traits.registerTrait(new Trait(game, "testp4", "Test P4", "p", 200, [], [traits.traits.testp3a, traits.traits.testp3b]));
        
        traits.registerTrait(new Trait(game, "testr1", "Test R1", "r", 20));
        traits.registerTrait(new Trait(game, "testr2", "Test R2", "r", 50, [], [traits.traits.testr1]));
        traits.registerTrait(new Trait(game, "testr3a", "Test R3a", "r", 100, [], [traits.traits.testr2]));
        traits.registerTrait(new Trait(game, "testr3b", "Test R3b", "r", 100, [], [traits.traits.testr2]));
        traits.registerTrait(new Trait(game, "testr4", "Test R4", "r", 200, [], [traits.traits.testr3a, traits.traits.testr3b]));
    }
}