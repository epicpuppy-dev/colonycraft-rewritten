import { InventoryMonitor } from "./InventoryMonitor";
import { Item } from "./Item";
import { InventoryDecay } from "./InventoryDecay";
import { ItemGroup } from "./ItemGroup";
import { ColonyCraft } from "../../../ColonyCraft";

export class Inventory {
    public categories: { [key: string]: ItemGroup } = {};
    public items: { [key: string]: Item } = {};
    public storageCapacity: number = 10;
    public storageUsed: number = 0;
    private monitor1: InventoryMonitor;
    private monitor2: InventoryMonitor;
    private decay: InventoryDecay;

    constructor (game: ColonyCraft) {
        this.monitor1 = new InventoryMonitor(game, 97);
        this.monitor2 = new InventoryMonitor(game, 99);
        this.decay = new InventoryDecay(game);
    }

    public addCategory(category: ItemGroup) {
        this.categories[category.key] = category;
    }

    public addItem(group: ItemGroup, item: Item) {
        this.items[item.key] = item;
        group.items.push(item);
    }

    public addCategoryWithItems(group: ItemGroup, items: Item[]) {
        this.addCategory(group);
        for (let item of items) {
            this.addItem(group, item);
        }
    }
}