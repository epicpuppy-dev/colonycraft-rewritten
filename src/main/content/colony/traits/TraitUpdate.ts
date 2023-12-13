import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";
import { TraitTypes } from "./TraitManager";

export class TraitUpdate extends TickingEntity {
    public tick(game: ColonyCraft): void {
        const traits = game.colony.traits.active;
        const manager = game.colony.traits;
        const jobs = game.colony.traits.developers;
        const workOutput = game.colony.welfare.workModifier;

        /*
        s: social
        c: cultural
        p: political
        r: religious
        */
        const types: TraitTypes[] = ["s", "c", "p", "r"];

        for (const type of types) {
            let progress = 0;
            for (const job of jobs) {
                if (job.type == type) {
                    progress += job.develop(game);
                }
            }
            if (type == "s") {
                progress += game.colony.population.adults / 20 + game.colony.population.children / 50 + game.colony.population.seniors / 50;
            }
            if (progress == 0) continue;
            progress = Math.max(Math.floor(progress * workOutput), 1);
            const trait = traits[type];
            if (trait == null) continue;
            trait.current = Math.min(trait.current + progress, trait.needed);
            trait.progress = trait.current / trait.needed;
            if (trait.progress >= 1) {
                trait.unlocked = true;
                traits[type] = null;
            }
        }

        for (const type of types) {
            if (traits[type] != null) continue;
            const available = [];
            for (const trait in manager.traits) {
                if (manager.traits[trait].unlocked || manager.traits[trait].type != type) continue;
                let valid = true;
                for (const req of manager.traits[trait].prereqs) {
                    if (manager.traits[req]) {
                        if (!manager.traits[req].unlocked) valid = false;
                    } else if (game.colony.research.technologies[req]) {
                        if (!game.colony.research.technologies[req].unlocked) valid = false;
                    }
                }
                if (valid) available.push(trait);
            }
            if (available.length != 0) traits[type] = manager.traits[available[Math.floor(Math.random() * available.length)]];
        }
    }
}