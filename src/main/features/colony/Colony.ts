import { Population } from "./population/Population";
import { Inventory } from "./inventory/Inventory";
import { Jobs } from "./jobs/Jobs";

export class Colony {
    public inventory: Inventory;
    public population: Population;
    public jobs: Jobs;

    constructor () {
        this.inventory = new Inventory();
        this.population = new Population(0, 2, 10, 0);
        this.jobs = new Jobs();

        // this.inventory.items.sticks.amount = 1000;
        // this.inventory.items.logs.amount = 1000;
    }
}