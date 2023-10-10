import { Population } from "./population/Population";
import { Inventory } from "./inventory/Inventory";
import { Jobs } from "./jobs/Jobs";
import { ResearchManager } from "./research/ResearchManager";
import { ColonyCraft } from "../../ColonyCraft";
import { TraitManager } from "./traits/TraitManager";
import { Welfare } from "./welfare/Welfare";
import { BuildingManager } from "./buildings/BuildingManager";

export class Colony {
    public inventory: Inventory;
    public population: Population;
    public jobs: Jobs;
    public research: ResearchManager;
    public traits: TraitManager;
    public welfare: Welfare;
    public buildings: BuildingManager;

    constructor (game: ColonyCraft) {
        this.inventory = new Inventory(game);
        this.population = new Population(game, 2, 4, 10, 0);
        this.jobs = new Jobs();
        this.research = new ResearchManager(game);
        this.traits = new TraitManager(game);
        this.welfare = new Welfare(game);
        this.buildings = new BuildingManager(game);

        // this.inventory.items.sticks.amount = 1000;
        // this.inventory.items.logs.amount = 1000;
    }
}