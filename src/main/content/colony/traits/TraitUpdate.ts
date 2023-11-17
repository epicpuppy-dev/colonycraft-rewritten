import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class TraitUpdate extends TickingEntity {
    public tick(game: ColonyCraft): void {
        const traits = game.colony.traits.active;
        const manager = game.colony.traits;
        const jobs = game.colony.jobs;
        const workOutput = game.colony.welfare.workModifier;

        /*
        s: social
        c: cultural
        p: political
        r: religious
        */
        
        if (traits.s) {
            traits.s.current = Math.min(traits.s.current + Math.floor(Math.max(game.colony.population.adults * 0.05 + game.colony.population.seniors * 0.01 + game.colony.population.children * 0.01, 1)), traits.s.needed);
            traits.s.progress = traits.s.current / traits.s.needed;
            if (traits.s.progress == 1) {
                traits.s.unlocked = true;
                traits.s = null;
            }
        }
        if (traits.c) {
            traits.c.current = Math.min(traits.c.current + Math.round(jobs.jobs.culture1.workersAssigned * workOutput), traits.c.needed);
            traits.c.progress = traits.c.current / traits.c.needed;
            if (traits.c.progress == 1) {
                traits.c.unlocked = true;
                traits.c = null;
            }
        }
        if (traits.p) {
            traits.p.current = Math.min(traits.p.current + Math.round(jobs.jobs.politic1.workersAssigned * workOutput), traits.p.needed);
            traits.p.progress = traits.p.current / traits.p.needed;
            if (traits.p.progress == 1) {
                traits.p.unlocked = true;
                traits.p = null;
            }
        }
        if (traits.r) {
            traits.r.current = Math.min(traits.r.current + Math.round(jobs.jobs.religion1.workersAssigned * workOutput), traits.r.needed);
            traits.r.progress = traits.r.current / traits.r.needed;
            if (traits.r.progress == 1) {
                traits.r.unlocked = true;
                traits.r = null;
            }
        }

        if (traits.s == null) {
            const available = [];
            for (const trait in manager.traits) {
                if (manager.traits[trait].unlocked || manager.traits[trait].type != "s") continue;
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
            if (available.length != 0) traits.s = manager.traits[available[Math.floor(Math.random() * available.length)]];
        }
        if (traits.c == null) {
            const available = [];
            for (const trait in manager.traits) {
                if (manager.traits[trait].unlocked || manager.traits[trait].type != "c") continue;
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
            if (available.length != 0) traits.c = manager.traits[available[Math.floor(Math.random() * available.length)]];
        }
        if (traits.p == null) {
            const available = [];
            for (const trait in manager.traits) {
                if (manager.traits[trait].unlocked || manager.traits[trait].type != "p") continue;
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
            if (available.length != 0) traits.p = manager.traits[available[Math.floor(Math.random() * available.length)]];
        }
        if (traits.r == null) {
            const available = [];
            for (const trait in manager.traits) {
                if (manager.traits[trait].unlocked || manager.traits[trait].type != "r") continue;
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
            if (available.length != 0) traits.r = manager.traits[available[Math.floor(Math.random() * available.length)]];
        }
    }
}