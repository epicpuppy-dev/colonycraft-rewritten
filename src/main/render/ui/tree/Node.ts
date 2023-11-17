export class Node {
    public prereqs: string[];
    public postreqs: string[] = [];
    public id: string;
    public name: string;
    public rank: number = -1;
    public subrank: number = 0;
    public subtotal: number = 0;
    public pos: [number, number] = [0, 0];
    public priority: number = 0;

    constructor(id: string, name: string, prereqs: string[]) {
        this.id = id;
        this.name = name;
        this.prereqs = prereqs;
    }
}