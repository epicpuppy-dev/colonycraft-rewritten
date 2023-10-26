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
    public type: "normal" | "progress" | "food";

    constructor (game: ColonyCraft, id: string, name: string, needed: TechPoints, desc: string[] = [], prereqs: string[] = [], type: "normal" | "progress" | "food" = "normal") {
        super();
        this.id = id;
        this.name = name;
        this.needed = needed;
        this.current = new TechPoints();
        this.prereqs = prereqs;
        this.desc = desc;
        this.type = type;

        game.save.register(this, "res." + this.id);
    }

    public save (): string {
        if (this.progress == 0 && !this.unlocked) return "";
        if (!this.unlocked ) return `${this.progress.toFixed(2)}-${this.current.invention.toString(36)}-${this.current.math.toString(36)}-${this.current.physics.toString(36)}-${this.current.chemistry.toString(36)}-${this.current.biology.toString(36)}-${this.current.quantum.toString(36)}`;
        else return `u`;
    }

    public load (data: string) {
        let split = data.split("-");
        if (split.length == 1 && split[0] == "u") {
            this.progress = 1;
            this.unlocked = true;
            this.current = new TechPoints();
        }
        // Backwards compatibility
        if (split.length == 8) {
            if (split[1] == "1") this.unlocked = true;
            split.splice(1, 1);
        }

        if (split.length >= 1 && !isNaN(parseFloat(split[0]))) this.progress = parseFloat(split[0]);
        if (split.length >= 2 && !isNaN(parseInt(split[2], 36))) this.current.invention = parseInt(split[2], 36);
        if (split.length >= 3 && !isNaN(parseInt(split[3], 36))) this.current.math = parseInt(split[3], 36);
        if (split.length >= 4 && !isNaN(parseInt(split[4], 36))) this.current.physics = parseInt(split[4], 36);
        if (split.length >= 5 && !isNaN(parseInt(split[5], 36))) this.current.chemistry = parseInt(split[5], 36);
        if (split.length >= 6 && !isNaN(parseInt(split[6], 36))) this.current.biology = parseInt(split[6], 36);
        if (split.length >= 7 && !isNaN(parseInt(split[7], 36))) this.current.quantum = parseInt(split[7], 36);
    }

    public newGame() {
        this.progress = 0;
        this.unlocked = false;
        this.current = new TechPoints();
    }
}