import { ColonyCraft } from "../../ColonyCraft";
import { Clickable } from "./Clickable";

export class ClickHandler extends Clickable {
    public activate: (game: ColonyCraft, x: number, y: number) => void;
    public active: (game: ColonyCraft) => boolean;
    public hover: boolean = false;
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number, activate: (game: ColonyCraft, x: number, y: number) => void, active: (game: ColonyCraft) => boolean) {
        super();
        this.activate = activate;
        this.active = active;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public update(game: ColonyCraft, x: number, y: number): void {
        //check if hover
        if (this.active(game)) {
            if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
                this.hover = true;
            } else {
                this.hover = false;
            }
        }
    }

    public click(game: ColonyCraft): void {
        if (this.active(game) && game.mouse.x >= this.x && game.mouse.x <= this.x + this.width && game.mouse.y >= this.y && game.mouse.y <= this.y + this.height) {
            this.activate(game, game.mouse.x, game.mouse.y);
        }
    }

    public reposition(x: number, y: number, width: number, height: number): void {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}