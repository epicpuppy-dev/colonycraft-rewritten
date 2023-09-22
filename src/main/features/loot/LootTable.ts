import { Item } from "../colony/inventory/Item";

export class LootTable {
    public id: string;
    private rolls: number;
    private items: {weight: number, item: Item | null, amount: number}[];
    private totalWeight: number;

    constructor (id: string, rolls: number, items: {weight: number, item: Item, amount: number}[]) {
        this.id = id;
        this.rolls = rolls;
        this.items = items;
        this.totalWeight = 0;
        for (const item of this.items) {
            this.totalWeight += item.weight;
        }
    }

    public roll (times: number) {
        const items: [Item | null, number][] = [];

        for (let i = 0; i < this.rolls * times; i++) {
            const roll = Math.random() * this.totalWeight;
            let total = 0;
            for (const item of this.items) {
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