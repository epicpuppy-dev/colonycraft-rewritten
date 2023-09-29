export class Trait {
    public id: string;
    public name: string;
    public type: "s"|"c"|"p"|"r";
    public needed: number;
    public current: number = 0;
    public prereqs: Trait[];
    public unlocked: boolean = false;
    public progress: number = 0;

    constructor (id: string, name: string, type: "s"|"c"|"p"|"r", needed: number, prereqs: Trait[] = []) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.needed = needed;
        this.prereqs = prereqs;
    }
}