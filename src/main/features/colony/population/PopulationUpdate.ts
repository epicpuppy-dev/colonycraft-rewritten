import { ColonyCraft } from "../../../ColonyCraft";
import { TickingEntity } from "../../TickingEntity";

export class PopulationUpdate extends TickingEntity {
    constructor () {
        super(60);
    }

    public tick (game: typeof ColonyCraft) {
        const population = game.colony.population;
        //0.2% chance of death per day
        if (population.seniors > 10000) {
            population.seniors -= Math.floor(Math.random() * population.seniors / 1000);
        } else {
            for (let i = 0; i < population.seniors; i++) {
                if (Math.random() < 0.002) {
                    population.seniors--;
                }
            }
        }
        //0.04% chance for each adult to age into a senior
        if (population.adults > 10000) {
            const ageup = Math.floor(Math.random() * population.adults / 1250);
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
        //0.04% chance for each adult to immediately die
        if (population.adults > 10000) {
            population.adults -= Math.floor(Math.random() * population.adults / 1250);
        } else {
            for (let i = 0; i < population.adults; i++) {
                if (Math.random() < 0.0004) {
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
            const babies = Math.floor(Math.random() * population.adults / 500);
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