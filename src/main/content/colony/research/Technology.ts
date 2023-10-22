import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { Unlockable } from "../other/Unlockable";
import { TechPoints } from "./TechPoints";

export class Technology extends Unlockable implements Saveable {
    public needed: TechPoints;
    public current: TechPoints;
    public progress: number = 0;
    public unlocked: boolean = false;
    public id: string;
    public name: string;
    public desc: string[];
    public prereqs: string[];

    constructor (game: ColonyCraft, id: string, name: string, needed: TechPoints, desc: string[] = [], prereqs: string[] = []) {
        super();
        this.id = id;
        this.name = name;
        this.needed = needed;
        this.current = new TechPoints();
        this.prereqs = prereqs;
        this.desc = desc;

        game.save.register(this, "res." + this.id);
    }

    public save (): string {
        if (this.progress == 0 && !this.unlocked) return "";
        return `${this.progress.toFixed(2)}-${this.unlocked ? "1" : ""}-${this.current.invention.toString(36)}-${this.current.math.toString(36)}-${this.current.physics.toString(36)}-${this.current.chemistry.toString(36)}-${this.current.biology.toString(36)}-${this.current.quantum.toString(36)}`;
    }

    public load (data: string) {
        let split = data.split("-");
        if (!isNaN(parseFloat(split[0]))) this.progress = parseFloat(split[0]);
        if (split[1] === "1") this.unlocked = true;
        if (!isNaN(parseInt(split[2], 36))) this.current.invention = parseInt(split[2], 36);
        if (!isNaN(parseInt(split[3], 36))) this.current.math = parseInt(split[3], 36);
        if (!isNaN(parseInt(split[4], 36))) this.current.physics = parseInt(split[4], 36);
        if (!isNaN(parseInt(split[5], 36))) this.current.chemistry = parseInt(split[5], 36);
        if (!isNaN(parseInt(split[6], 36))) this.current.biology = parseInt(split[6], 36);
        if (!isNaN(parseInt(split[7], 36))) this.current.quantum = parseInt(split[7], 36);
    }
}