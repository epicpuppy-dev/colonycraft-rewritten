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

        research.progress = 0;
        research.progress = 0;
        let count = 0;
        if (research.needed.invention > 0) {
            research.progress += research.current.invention / research.needed.invention;
            count++;
        }
        if (research.needed.math > 0) {
            research.progress += research.current.math / research.needed.math;
            count++;
        }
        if (research.needed.physics > 0) {
            research.progress += research.current.physics / research.needed.physics;
            count++;
        }
        if (research.needed.chemistry > 0) {
            research.progress += research.current.chemistry / research.needed.chemistry;
            count++;
        }
        if (research.needed.biology > 0) {
            research.progress += research.current.biology / research.needed.biology;
            count++;
        }
        if (research.needed.quantum > 0) {
            research.progress += research.current.quantum / research.needed.quantum;
            count++;
        }

        research.progress /= count;

        if (research.progress >= 1) {
            research.unlocked = true;
            game.colony.research.active = null;
        }
    }
}