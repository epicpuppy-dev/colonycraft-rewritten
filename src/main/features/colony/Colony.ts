import { Population } from "./population/Population";
import { Inventory } from "./inventory/Inventory";
import { Jobs } from "./jobs/Jobs";
import { ResearchManager } from "./research/ResearchManager";

export class Colony {
    public inventory: Inventory;
    public population: Population;
    public jobs: Jobs;
    public research: ResearchManager;

    constructor () {
        this.inventory = new Inventory();
        this.population = new Population(2, 4, 10, 0);
        this.jobs = new Jobs();
        this.research = new ResearchManager();

        // this.inventory.items.sticks.amount = 1000;
        // this.inventory.items.logs.amount = 1000;
    }
}