export class Requirement {
    public pre: string;
    public post: string;
    public points: [number, number][];

    constructor(pre: string, post: string, points: [number, number][]) {
        this.pre = pre;
        this.post = post;
        this.points = points;
    }
}