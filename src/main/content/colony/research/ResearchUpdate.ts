import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class ResearchUpdate extends TickingEntity {
    public tick(game: ColonyCraft): void {
        const research = game.colony.research.active;
        const jobs = game.colony.jobs.jobs;

        if (research == null) return;
        research.current.invention = Math.min(research.current.invention + jobs.invention.workersAssigned, research.needed.invention);
        research.current.math = Math.min(research.current.math + jobs.math.workersAssigned, research.needed.math);
        research.current.physics = Math.min(research.current.physics + jobs.physics.workersAssigned, research.needed.physics);
        research.current.chemistry = Math.min(research.current.chemistry + jobs.chemistry.workersAssigned, research.needed.chemistry);
        research.current.biology = Math.min(research.current.biology + jobs.biology.workersAssigned, research.needed.biology);
        research.current.quantum = Math.min(research.current.quantum + jobs.quantum.workersAssigned, research.needed.quantum);

        research.progress = (research.current.invention + research.current.math + research.current.physics + research.current.chemistry + research.current.biology + research.current.quantum) / (research.needed.invention + research.needed.math + research.needed.physics + research.needed.chemistry + research.needed.biology + research.needed.quantum);

        if (research.progress == 1) {
            research.unlocked = true;
            game.colony.research.active = null;
        }
    }
}