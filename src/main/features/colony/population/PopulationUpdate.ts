import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class PopulationUpdate extends TickingEntity {
    constructor () {
        super(60);
    }

    public tick (game: typeof ColonyCraft) {
        const population = game.colony.population;
        //0.1% chance of death per day
        if (population.seniors > 1000) {
            population.seniors -= Math.floor(Math.random() * population.seniors / 1000);
        } else {
            for (let i = 0; i < population.seniors; i++) {
                if (Math.random() < 0.001) {
                    population.seniors--;
                }
            }
        }
        //0.04% chance for each adult to age into a senior
        if (population.adults > 1000) {
            const ageup = Math.floor(Math.random() * population.adults / 2500);
            population.adults -= ageup;
            population.seniors += ageup;
        } else {
            for (let i = 0; i < population.adults; i++) {
                if (Math.random() < 0.0004) {
                    population.adults--;
                    population.seniors++;
                }
            }
        }
        //0.4% chance for each child to age into an adult
        if (population.children > 1000) {
            const ageup = Math.floor(Math.random() * population.children / 250);
            population.children -= ageup;
            population.adults += ageup;
        } else {
            for (let i = 0; i < population.children; i++) {
                if (Math.random() < 0.004) {
                    population.children--;
                    population.adults++;
                }
            }
        }
        //0.5% chance for each baby to age into a child
        if (population.babies > 1000) {
            const ageup = Math.floor(Math.random() * population.babies / 200);
            population.babies -= ageup;
            population.children += ageup;
        } else {
            for (let i = 0; i < population.babies; i++) {
                if (Math.random() < 0.005) {
                    population.babies--;
                    population.children++;
                }
            }
        }
        //0.2% chance for each pair of adults to have a baby
        if (population.adults > 1000) {
            const babies = Math.floor(Math.random() * population.adults / 1000);
            population.babies += babies;
        } else {
            for (let i = 0; i < population.adults / 2; i++) {
                if (Math.random() < 0.002) {
                    population.babies++;
                }
            }
        }
    }
}