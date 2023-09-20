import { Item } from "./Item";
import { ItemGroup } from "./ItemGroup";

export class Inventory {
    public categories: { [key: string]: ItemGroup } = {};
    public items: { [key: string]: Item } = {};
    public storageCapacity: number = 10;
    public storageUsed: number = 0;

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

    public calculateStorageUsed(): void {
        this.storageUsed = 0;
        for (let key in this.items) {
            //this.items[key].amount++;
            this.storageUsed += this.items[key].volume * this.items[key].amount * 0.001;
        }
    }
    
}