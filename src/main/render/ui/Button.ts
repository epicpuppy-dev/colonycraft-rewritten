import { ColonyCraft } from "../../ColonyCraft";
import { Clickable } from "./Clickable";

export class Button extends Clickable {
    public activate: (game: ColonyCraft) => void;
    public active: (game: ColonyCraft, prevScreens: string[]) => boolean;
    public hover: boolean = false;
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number, activate: (game: ColonyCraft) => void, active: (game: ColonyCraft, prevScreens: string[]) => boolean) {
        super();
        this.activate = activate;
        this.active = active;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public update(game: ColonyCraft, x: number, y: number, prevScreens: string[]): void {
        //check if hover
        if (this.active(game, prevScreens)) {
            if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
                this.hover = true;
            } else {
                this.hover = false;
            }
        }
    }

    public click(game: ColonyCraft, prevScreens: string[]): void {
        if (this.active(game, prevScreens) && game.mouse.x >= this.x && game.mouse.x <= this.x + this.width && game.mouse.y >= this.y && game.mouse.y <= this.y + this.height) {
            this.activate(game);
        }
    }

    public reposition(x: number, y: number, width: number, height: number): void {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}