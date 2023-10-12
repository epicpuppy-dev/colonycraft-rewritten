import { game } from "../..";
import { ColonyCraft } from "../ColonyCraft";
import { Clickable } from "../render/ui/Clickable";

export class MouseController {
    public x: number = 0;
    public y: number = 0;
    private clickables: [Clickable, number][] = [];

    constructor() {
        document.addEventListener('mousemove', (event) => {
            this.x = event.clientX;
            this.y = event.clientY;
        });

        document.addEventListener('mousedown', (event) => { 
            this.clickables.forEach((clickable) => {
                clickable[0].click(game);
            });
        });
    }

    public registerClickable(clickable: Clickable, priority: number = 0): void {
        this.clickables.push([clickable, priority]);
        this.clickables.sort((a, b) => a[1] - b[1]);
    }

    public removeClickable(clickable: Clickable): void {
        for (let i = 0; i < this.clickables.length; i++) {
            if (this.clickables[i][0] === clickable) {
                this.clickables.splice(i, 1);
                break;
            }
        }
    }

    public update(game: ColonyCraft): void {
        //perform an update on each button
        this.clickables.forEach((button) => {
            button[0].update(game, this.x, this.y);
        });
    }
}