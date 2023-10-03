import { Unlockable } from "../other/Unlockable";
import { Technology } from "../research/Technology";

export class Trait extends Unlockable {
    public id: string;
    public name: string;
    public type: "s"|"c"|"p"|"r";
    public needed: number;
    public current: number = 0;
    public desc: string[];
    public prereqs: Unlockable[] = [];
    public unlocked: boolean = false;
    public progress: number = 0;

    constructor (id: string, name: string, type: "s"|"c"|"p"|"r", needed: number, desc: string[] = [], prereqs: Unlockable[] = []) {
        super();
        this.id = id;
        this.name = name;
        this.type = type;
        this.needed = needed;
        this.desc = desc;
        this.prereqs = prereqs;
    }
}