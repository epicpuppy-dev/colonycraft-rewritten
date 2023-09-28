import { ResearchManager } from "../content/colony/research/ResearchManager";
import { TechPoints } from "../content/colony/research/TechPoints";
import { Technology } from "../content/colony/research/Technology";

export class TechnologyData {
    public static addTechnologies (manager: ResearchManager) {
        manager.registerTechnology(new Technology("test", "Test", new TechPoints(20), ["Unlocks test"]));
        manager.registerTechnology(new Technology("testa", "Test A", new TechPoints(15), ["Unlocks another test", "line 2"]));
        manager.registerTechnology(new Technology("testb", "Test B", new TechPoints(1111, 1111, 1111, 1111, 1111, 1111), ["yahoooooooooooooo"]));
        manager.registerTechnology(new Technology("test2", "Test 2", new TechPoints(40, 20), [], [manager.technologies.test]));
        manager.registerTechnology(new Technology("test2a", "Test 2a", new TechPoints(30, 15), [], [manager.technologies.test]))
        manager.registerTechnology(new Technology("test3", "Test 3", new TechPoints(60, 40, 20), [], [manager.technologies.test2]));
        manager.registerTechnology(new Technology("test4", "Test 4", new TechPoints(80, 60, 40, 20), [], [manager.technologies.test3]));
        manager.registerTechnology(new Technology("test5", "Test 5", new TechPoints(100, 80, 60, 40, 20), [], [manager.technologies.test4]));
        manager.registerTechnology(new Technology("test6", "Test 6", new TechPoints(120, 100, 80, 60, 40, 20), [], [manager.technologies.test5]));
    }
}