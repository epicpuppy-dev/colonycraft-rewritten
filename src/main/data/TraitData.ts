import { ColonyCraft } from "../ColonyCraft";
import { Trait } from "../content/colony/traits/Trait";
import { TraitManager } from "../content/colony/traits/TraitManager";

export class TraitData {
    public static addTraits (game: ColonyCraft, manager: TraitManager) {
        manager.registerTrait(new Trait("tests1", "Test S1", "s", 20));
        manager.registerTrait(new Trait("tests2", "Test S2", "s", 50, [manager.traits.tests1]));
        manager.registerTrait(new Trait("tests3a", "Test S3a", "s", 100, [manager.traits.tests2]));
        manager.registerTrait(new Trait("tests3b", "Test S3b", "s", 100, [manager.traits.tests2]));
        manager.registerTrait(new Trait("tests4", "Test S4", "s", 200, [manager.traits.tests3a, manager.traits.tests3b]));
        manager.registerTrait(new Trait("testc1", "Test C1", "c", 20));
        manager.registerTrait(new Trait("testc2", "Test C2", "c", 50, [manager.traits.testc1]));
        manager.registerTrait(new Trait("testc3a", "Test C3a", "c", 100, [manager.traits.testc2]));
        manager.registerTrait(new Trait("testc3b", "Test C3b", "c", 100, [manager.traits.testc2]));
        manager.registerTrait(new Trait("testc4", "Test C4", "c", 200, [manager.traits.testc3a, manager.traits.testc3b]));
        manager.registerTrait(new Trait("testp1", "Test P1", "p", 20));
        manager.registerTrait(new Trait("testp2", "Test P2", "p", 50, [manager.traits.testp1]));
        manager.registerTrait(new Trait("testp3a", "Test P3a", "p", 100, [manager.traits.testp2]));
        manager.registerTrait(new Trait("testp3b", "Test P3b", "p", 100, [manager.traits.testp2]));
        manager.registerTrait(new Trait("testp4", "Test P4", "p", 200, [manager.traits.testp3a, manager.traits.testp3b]));
        manager.registerTrait(new Trait("testr1", "Test R1", "r", 20));
        manager.registerTrait(new Trait("testr2", "Test R2", "r", 50, [manager.traits.testr1]));
        manager.registerTrait(new Trait("testr3a", "Test R3a", "r", 100, [manager.traits.testr2]));
        manager.registerTrait(new Trait("testr3b", "Test R3b", "r", 100, [manager.traits.testr2]));
        manager.registerTrait(new Trait("testr4", "Test R4", "r", 200, [manager.traits.testr3a, manager.traits.testr3b]));
    }
}