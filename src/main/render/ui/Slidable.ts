import { ColonyCraft } from "../../ColonyCraft";
import { Holdable } from "./Holdable";

export class Slidable extends Holdable {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    private active: (game: ColonyCraft, x: number, y: number, prevScreens: string[]) => boolean;
    private onUpdate: (game: ColonyCraft, x: number, y: number, prevScreens: string[]) => void;
    private onDown: (game: ColonyCraft, x: number, y: number, prevScreens: string[]) => void;
    private onUp: (game: ColonyCraft, x: number, y: number, offsetX: number, offsetY: number, prevScreens: string[]) => void;
    private onTick: (game: ColonyCraft, x: number, y: number, offsetX: number, offsetY: number, prevScreens: string[]) => void;
    private startX: number = 0;
    private startY: number = 0;
    public offsetX: number = 0;
    public offsetY: number = 0;

    constructor(x: number, y: number, width: number, height: number,
            active: (game: ColonyCraft, x: number, y: number, prevScreens: string[]) => boolean = () => true, 
            onUpdate: (game: ColonyCraft, x: number, y: number, prevScreens: string[]) => void = () => {},
            onDown: (game: ColonyCraft, x: number, y: number, prevScreens: string[]) => void = () => {}, 
            onTick: (game: ColonyCraft, x: number, y: number, offsetX: number, offsetY: number, prevScreens: string[]) => void = () => {}, 
            onUp: (game: ColonyCraft, x: number, y: number, offsetX: number, offsetY: number, prevScreens: string[]) => void = () => {}
        ) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.active = active;
        this.onDown = onDown;
        this.onTick = onTick;
        this.onUp = onUp;
        this.onUpdate = onUpdate;
    }

    public update(game: ColonyCraft, x: number, y: number, prevScreens: string[]): void {
        if (!this.active(game, x, y, prevScreens)) return;
        this.hover = x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
        this.onUpdate(game, x, y, prevScreens);
    }

    public mousedown(game: ColonyCraft, x: number, y: number, prevScreens: string[]): void {
        if (!this.active(game, x, y, prevScreens)) return;
        if (x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height) {
            this.startX = x;
            this.startY = y;
            this.onDown(game, x ,y, prevScreens);
            this.held = true;
        }
    }

    public mouseup(game: ColonyCraft, x: number, y: number, prevScreens: string[]): void {
        if (!this.active(game, x, y, prevScreens)) return;
        this.held = false;
        this.onUp(game, x, y, this.offsetX, this.offsetY, prevScreens);
    }

    public mousetick(game: ColonyCraft, x: number, y: number, prevScreens: string[]): void {
        if (!this.active(game, x, y, prevScreens)) return;
        if (this.held) {
            this.offsetX = x - this.startX;
            this.offsetY = y - this.startY;
            this.onTick(game, x, y, this.offsetX, this.offsetY, prevScreens);
        }
    }
    
    public reposition(x: number, y: number, width: number, height: number): void {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}