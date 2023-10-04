import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class PopulationUpdate extends TickingEntity {
    constructor (game: ColonyCraft) {
        super(game, 60);
    }

    public tick (game: ColonyCraft) {
        const population = game.colony.population;
        const health = game.colony.welfare.healthModifier;
        //0.2% chance of death per day
        if (population.seniors > 10000) {
            population.seniors -= Math.floor(Math.random() * population.seniors / ((1 / 0.002) * (1 / health)));
        } else {
            for (let i = 0; i < population.seniors; i++) {
                if (Math.random() < 0.002 * (1 / health)) {
                    population.seniors--;
                }
            }
        }
        //0.04% chance for each adult to age into a senior
        if (population.adults > 10000) {
            const ageup = Math.floor(Math.random() * population.adults / ((1 / 0.0004) * (1 / health)));
            population.adults -= ageup;
            population.seniors += ageup;
        } else {
            for (let i = 0; i < population.adults; i++) {
                if (Math.random() < 0.0004 * (1 / health)) {
                    population.adults--;
                    population.seniors++;
                }
            }
        }
        //0.04% chance for each adult to immediately die
        if (population.adults > 10000) {
            population.adults -= Math.floor(Math.random() * population.adults / ((1 / 0.0004) * (1 / health)));
        } else {
            for (let i = 0; i < population.adults; i++) {
                if (Math.random() < 0.0004 * (1 / health)) {
                    population.adults--;
                }
            }
        }
        //1.0% chance for each child to age into an adult
        if (population.children > 10000) {
            const ageup = Math.floor(Math.random() * population.children / 50);
            population.children -= ageup;
            population.adults += ageup;
        } else {
            for (let i = 0; i < population.children; i++) {
                if (Math.random() < 0.005) {
                    population.children--;
                    population.adults++;
                }
            }
        }
        //2.0% chance for each baby to age into a child
        if (population.babies > 10000) {
            const ageup = Math.floor(Math.random() * population.babies / 25);
            population.babies -= ageup;
            population.children += ageup;
        } else {
            for (let i = 0; i < population.babies; i++) {
                if (Math.random() < 0.01) {
                    population.babies--;
                    population.children++;
                }
            }
        }
        //0.2% chance for each pair of adults to have a baby
        if (population.adults > 10000) {
            const babies = Math.floor(Math.random() * population.adults / ((1 / 0.001) * health));
            population.babies += babies;
        } else {
            for (let i = 0; i < population.adults / 2; i++) {
                if (Math.random() < 0.002 * health) {
                    population.babies++;
                }
            }
        }
        const workers = population.adults;
        while (game.colony.jobs.workersAssigned > workers) {
            const job = game.colony.jobs.jobs[Object.keys(game.colony.jobs.jobs)[Math.floor(Math.random() * Object.keys(game.colony.jobs.jobs).length)]];
            if (job.workersAssigned > 0) job.unassign(game, 1);
        }
    }
}