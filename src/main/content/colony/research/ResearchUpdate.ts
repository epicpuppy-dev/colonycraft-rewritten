import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class ResearchUpdate extends TickingEntity {
    public tick(game: ColonyCraft): void {
        const research = game.colony.research.active;
        const jobs = game.colony.jobs.jobs;
        const workOutput = game.colony.welfare.workModifier;

        if (research == null) return;
        research.current.invention = Math.min(research.current.invention + Math.round(jobs.invention1.workersAssigned * workOutput), research.needed.invention);
        research.current.math = Math.min(research.current.math + Math.round(jobs.math1.workersAssigned * workOutput), research.needed.math);
        research.current.physics = Math.min(research.current.physics + Math.round(jobs.physics1.workersAssigned * workOutput), research.needed.physics);
        research.current.chemistry = Math.min(research.current.chemistry + Math.round(jobs.chemistry1.workersAssigned * workOutput), research.needed.chemistry);
        research.current.biology = Math.min(research.current.biology + Math.round(jobs.biology1.workersAssigned * workOutput), research.needed.biology);
        research.current.quantum = Math.min(research.current.quantum + Math.round(jobs.quantum1.workersAssigned * workOutput), research.needed.quantum);

        research.progress = (research.current.invention + research.current.math + research.current.physics + research.current.chemistry + research.current.biology + research.current.quantum) / (research.needed.invention + research.needed.math + research.needed.physics + research.needed.chemistry + research.needed.biology + research.needed.quantum);

        if (research.progress == 1) {
            research.unlocked = true;
            game.colony.research.active = null;
        }
    }
}