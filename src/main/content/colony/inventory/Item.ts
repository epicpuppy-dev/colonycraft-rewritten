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
    public min: number = 0;
    public max: number = 0;
    public name: string;
    //decay percentage per tick
    public decay: number;
    public discovered: boolean = false;

    constructor(game: ColonyCraft, key: string, volume: number, name: string, decay: number) {
        this.key = key;
        this.volume = volume;
        this.name = name;
        this.decay = decay;

        game.save.register(this, "inv." + this.key);
    }

    public save (): string {
        if (this.amount == 0 && !this.discovered) return "";
        return `${this.amount.toString(36)}-${this.min.toString(36)}-${this.max.toString(36)}`;
    }

    public load (data: string) {
        let split = data.split("-");
        if (!isNaN(parseInt(split[0], 36))) this.amount = parseInt(split[0], 36);
        if (split.length > 1) {
            if (!isNaN(parseInt(split[1], 36))) this.min = parseInt(split[1], 36);
            if (!isNaN(parseInt(split[2], 36))) this.max = parseInt(split[2], 36);
        }
        this.discovered = true;
    }

    public newGame() {
        this.amount = 0;
        this.discovered = false;
    }

    public add(amount: number, force: boolean = false) {
        if (!force && this.amount < (this.max > 0 ? this.max : Infinity)) this.amount = Math.min(this.amount + amount, this.max > 0 ? this.max : Infinity);
        else if (force) this.amount += amount;
        if (this.amount > 0) this.discovered = true;
    }
}