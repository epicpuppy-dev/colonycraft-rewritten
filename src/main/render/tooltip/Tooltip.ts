import { ColonyCraft } from "../../ColonyCraft";

export class Tooltip {
    public id: string;
    public title: {text: string | ((game: ColonyCraft) => string), color: string};
    public lines: {text: string | ((game: ColonyCraft) => string), color: string}[] | ((game: ColonyCraft) => {text: string | ((game: ColonyCraft) => string), color: string}[]);
    public hitbox: {x: number, y: number, width: number, height: number};
    public style: {background: string, border: string, borderRadius: number, padding: number, titleLineSpacing: number, lineSpacing: number};
    public active: (game: ColonyCraft) => boolean;
    public hoverTime: number;

    constructor(game: ColonyCraft, id: string, text: {text: string | ((game: ColonyCraft) => string), 
        color: string}[], x: number, y: number, width: number, height: number, active: (game: ColonyCraft) => boolean, 
        style: {background: string, border: string, borderRadius: number, padding: number, titleLineSpacing: number, lineSpacing: number} = {background: "#222222", border: "#777777", borderRadius: 2, padding: 6, titleLineSpacing: 10, lineSpacing: 5}, 
        hoverTime: number = 0.5) {
        this.id = id;
        this.title = text[0];
        this.lines = text.slice(1);
        this.hitbox = {x: x, y: y, width: width, height: height};
        this.active = active;
        this.style = style;
        this.hoverTime = hoverTime;
    }
}