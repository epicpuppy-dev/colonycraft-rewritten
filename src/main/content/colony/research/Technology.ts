import { Unlockable } from "../other/Unlockable";
import { TechPoints } from "./TechPoints";

export class Technology extends Unlockable {
    public needed: TechPoints;
    public current: TechPoints;
    public progress: number = 0;
    public unlocked: boolean = false;
    public id: string;
    public name: string;
    public desc: string[];
    public prereqs: Unlockable[];

    constructor (id: string, name: string, needed: TechPoints, desc: string[] = [], prereqs: Unlockable[] = []) {
        super();
        this.id = id;
        this.name = name;
        this.needed = needed;
        this.current = new TechPoints();
        this.prereqs = prereqs;
        this.desc = desc;
    }
}