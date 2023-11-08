import { Population } from "./population/Population";
import { Inventory } from "./inventory/Inventory";
import { JobManager } from "./jobs/JobManager";
import { ResearchManager } from "./research/ResearchManager";
import { ColonyCraft } from "../../ColonyCraft";
import { TraitManager } from "./traits/TraitManager";
import { Welfare } from "./welfare/Welfare";
import { BuildingManager } from "./buildings/BuildingManager";
import { RecipeManager } from "./crafting/RecipeManager";
import { Unlockable } from "./other/Unlockable";
import { Technology } from "./research/Technology";
import { Trait } from "./traits/Trait";

export class Colony {
    public inventory: Inventory;
    public population: Population;
    public jobs: JobManager;
    public research: ResearchManager;
    public traits: TraitManager;
    public welfare: Welfare;
    public buildings: BuildingManager;
    public recipes: RecipeManager;

    constructor (game: ColonyCraft) {
        this.inventory = new Inventory(game);
        this.population = new Population(game, 2, 4, 10, 0);
        this.jobs = new JobManager(game);
        this.research = new ResearchManager(game);
        this.traits = new TraitManager(game);
        this.welfare = new Welfare(game);
        this.buildings = new BuildingManager(game);
        this.recipes = new RecipeManager();

        // this.inventory.items.sticks.amount = 1000;
        // this.inventory.items.logs.amount = 1000;
    }

    public getUnlockable (id: string): Trait | Technology {
        let unlockable: Trait | Technology = this.research.technologies[id];
        if (!unlockable) {
            unlockable = this.traits.traits[id];
        }
        return unlockable;
    }
}