import { game } from "../../../..";
import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";

export class Item implements Saveable {
    //localization key, also the internal id used to access the item
    //loc: inventory.items.[key]
    public key: string;
    //size per 1 unit of item
    public volume: number;
    //current stock
    public amount: number = 0;
    public name: string;
    //decay percentage per tick
    public decay: number;

    constructor(game: ColonyCraft, key: string, volume: number, name: string, decay: number) {
        this.key = key;
        this.volume = volume;
        this.name = name;
        this.decay = decay;

        game.save.register(this, "inv." + this.key);
    }

    public save (): string {
        if (this.amount == 0) return "";
        return `${this.amount.toString(36)}`;
    }

    public load (data: string) {
        if (!isNaN(parseInt(data, 36))) this.amount = parseInt(data, 36);
    }
}