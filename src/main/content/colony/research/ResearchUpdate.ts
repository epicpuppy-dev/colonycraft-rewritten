import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";
import { ResearchTypes } from "./ResearchManager";

export class ResearchUpdate extends TickingEntity {
    public tick(game: ColonyCraft): void {
        const research = game.colony.research.active;
        const jobs = game.colony.research.researchers;
        const workOutput = game.colony.welfare.workModifier;

        if (research == null) return;
        const types: ResearchTypes[] = ["invention", "math", "physics", "chemistry", "biology", "quantum"];
        for (const type of types) {
            let progress = 0;
            for (const job of jobs) {
                if (job.type == type) {
                    progress += job.research(game);
                }
            }
            if (progress == 0) continue;
            progress = Math.max(Math.floor(progress * workOutput), 1);
            research.current[type] = Math.min(research.current[type] + progress, research.needed[type]);
        }

        research.progress = (research.current.invention + research.current.math + research.current.physics + research.current.chemistry + research.current.biology + research.current.quantum) / (research.needed.invention + research.needed.math + research.needed.physics + research.needed.chemistry + research.needed.biology + research.needed.quantum);

        if (research.progress >= 1) {
            research.unlocked = true;
            game.colony.research.active = null;
        }
    }
}