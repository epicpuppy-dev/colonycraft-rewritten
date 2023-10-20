import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { Unlockable } from "../other/Unlockable";

export class Trait extends Unlockable implements Saveable {
    public id: string;
    public name: string;
    public type: "s"|"c"|"p"|"r";
    public needed: number;
    public current: number = 0;
    public desc: string[];
    public prereqs: Unlockable[] = [];
    public unlocked: boolean = false;
    public progress: number = 0;

    constructor (game: ColonyCraft, id: string, name: string, type: "s"|"c"|"p"|"r", needed: number, desc: string[] = [], prereqs: Unlockable[] = []) {
        super();
        this.id = id;
        this.name = name;
        this.type = type;
        this.needed = needed;
        this.desc = desc;
        this.prereqs = prereqs;

        game.save.register(this, "trait." + this.id);
    }

    public save (): string {
        if (this.progress == 0 && !this.unlocked) return "";
        return `${this.progress.toFixed(this.progress == 1 ? 0 : 2)}-${this.unlocked ? "1" : ""}-${this.current.toString(36)}`;
    }

    public load (data: string) {
        let split = data.split("-");
        if (!isNaN(parseFloat(split[0]))) this.progress = parseFloat(split[0]);
        if (split[1] === "1") this.unlocked = true;
        if (!isNaN(parseInt(split[2], 36))) this.current = parseInt(split[2], 36);
    }
}