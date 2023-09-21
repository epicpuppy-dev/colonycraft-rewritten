import { InventoryData } from "../../data/InventoryData";
import { Population } from "./population/Population";
import { Inventory } from "./inventory/Inventory";

export class Colony {
    public inventory: Inventory;
    public population: Population;

    constructor () {
        this.inventory = new Inventory();
        this.population = new Population(0, 4, 12, 0);

        InventoryData.addItems(this.inventory);

        this.inventory.items.sticks.amount = 1000;
        this.inventory.items.logs.amount = 1000;
    }
}