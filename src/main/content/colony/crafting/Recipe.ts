import { LootTable } from "../../loot/LootTable";
import { Item } from "../inventory/Item";

export class Recipe {
    public id: string;
    public inputs: {item: Item, amount: number}[];
    public outputs: {item: Item, amount: number}[] | LootTable;

    constructor (id: string, inputs: {item: Item, amount: number}[], outputs: {item: Item, amount: number}[] | LootTable) {
        this.id = id;
        this.inputs = inputs;
        this.outputs = outputs;
    }

    public craft (times: number) {
        let maxCrafts = times;
        for (const input of this.inputs) {
            const amount = Math.max(input.item.amount - input.item.min, 0);
            if (amount < input.amount * times) {
                maxCrafts = Math.min(maxCrafts, Math.floor(amount / input.amount));
            }
        }

        for (const input of this.inputs) {
            input.item.amount -= input.amount * maxCrafts;
        }

        if (this.outputs instanceof LootTable) for (const output of this.outputs.roll(maxCrafts)) {
            if (output[0] != null) {
                output[0].add(output[1]);
            }
        } else for (const output of this.outputs) {
            output.item.add(output.amount * maxCrafts);
        }
    }
}