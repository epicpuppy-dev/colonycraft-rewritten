import { InventoryUpdate } from "./InventoryUpdate";
import { Item } from "./Item";
import { InventoryDecay } from "./InventoryDecay";
import { ItemGroup } from "./ItemGroup";
import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { StorageUpdate } from "./StorageUpdate";

export class Inventory {
    public categories: { [key: string]: ItemGroup } = {};
    public items: { [key: string]: Item } = {};
    public storageCapacity: number = 10;
    public storageUsed: number = 0;
    public storageUpdate: StorageUpdate;
    public preUpdate: InventoryUpdate;
    private postUpdate: InventoryUpdate;
    private decay: InventoryDecay;

    constructor (game: ColonyCraft) {
        this.storageUpdate = new StorageUpdate(game);
        this.preUpdate = new InventoryUpdate(game, 97);
        this.postUpdate = new InventoryUpdate(game, 99);
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

    public forceStorageUpdate(game: ColonyCraft) {
        this.preUpdate.tick(game);
    }
}