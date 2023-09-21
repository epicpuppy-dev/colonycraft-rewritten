import { InventoryData } from "../../data/InventoryData";
import { Population } from "./Population";
import { Inventory } from "./inventory/Inventory";

export class Colony {
    public inventory: Inventory;
    public population: Population;

    constructor () {
        this.inventory = new Inventory();
        this.population = new Population();

        InventoryData.addItems(this.inventory);
    }
}