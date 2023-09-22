import { Item } from "../colony/inventory/Item";

export class LootTable {
    public id: string;
    private rolls: number;
    private items: { [key: string]: {weight: number, item: Item | null, amount: number} };
    private totalWeight: number;

    constructor (id: string, rolls: number, items: { [key: string]: {weight: number, item: Item, amount: number} }) {
        this.id = id;
        this.rolls = rolls;
        this.items = items;
        this.totalWeight = 0;
        for (const key in this.items) {
            const item = this.items[key];
            this.totalWeight += item.weight;
        }
    }

    public roll () {
        const items: [Item | null, number][] = [];

        for (let i = 0; i < this.rolls; i++) {
            const roll = Math.random() * this.totalWeight;
            let total = 0;
            for (const key in this.items) {
                const item = this.items[key];
                total += item.weight;
                if (roll <= total) {
                    items.push([item.item, item.amount]);
                    break;
                }
            }
        }

        return items;
    }
}