import { game } from "../..";
import { ColonyCraft } from "../ColonyCraft";
import { Clickable } from "../render/ui/Clickable";

export class MouseController {
    public x: number = 0;
    public y: number = 0;
    private clickables: Clickable[] = [];

    constructor() {
        document.addEventListener('mousemove', (event) => {
            this.x = event.clientX;
            this.y = event.clientY;
        });

        document.addEventListener('mousedown', (event) => { 
            this.clickables.forEach((clickable) => {
                clickable.click(game);
            });
        });
    }

    public registerClickable(clickable: Clickable): void {
        this.clickables.push(clickable);
    }

    public removeClickable(clickable: Clickable): void {
        for (let i = 0; i < this.clickables.length; i++) {
            if (this.clickables[i] === clickable) {
                this.clickables.splice(i, 1);
                break;
            }
        }
    }

    public update(game: ColonyCraft): void {
        //perform an update on each button
        this.clickables.forEach((button) => {
            button.update(game, this.x, this.y);
        });
    }
}