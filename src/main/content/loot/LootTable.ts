import { Item } from "../colony/inventory/Item";

export class LootTable {
    public id: string;
    readonly rolls: number;
    readonly items: {weight: number, item: Item | null, amount: number}[];
    readonly totalWeight: number;

    constructor (id: string, rolls: number, items: {weight: number, item: Item | null, amount: number}[]) {
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

        const rolls = this.rolls * times;

        if (rolls > 1000) {
            for (const item of this.items) {
                items.push([item.item, Math.floor(item.amount * (item.weight / this.totalWeight) * rolls)])
            }
        } else {
            for (let i = 0; i < rolls; i++) {
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
        }

        return items;
    }
}