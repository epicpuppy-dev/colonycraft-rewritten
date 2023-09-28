import { TechPoints } from "./TechPoints";

export class Technology {
    public needed: TechPoints;
    public current: TechPoints;
    public progress: number = 0;
    public unlocked: boolean = false;
    public id: string;
    public name: string;
    public desc: string[];
    public prereqs: Technology[];

    constructor (id: string, name: string, needed: TechPoints, desc: string[] = [], prereqs: Technology[] = []) {
        this.id = id;
        this.name = name;
        this.needed = needed;
        this.current = new TechPoints();
        this.prereqs = prereqs;
        this.desc = desc;
    }
}