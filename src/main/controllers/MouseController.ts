import { game } from "../..";
import { ColonyCraft } from "../ColonyCraft";
import { Clickable } from "../render/ui/Clickable";
import { Holdable } from "../render/ui/Holdable";
import { Scrollable } from "../render/ui/Scrollable";

export class MouseController {
    public x: number = 0;
    public y: number = 0;
    private lastScrollX: number = 0;
    private lastScrollY: number = 0;
    private ticking: boolean = false;
    private clickables: [Clickable, number][] = [];
    private holdables: [Holdable, number][] = [];
    private scrollables: [Scrollable, number][] = [];

    constructor() {
        document.addEventListener('mousemove', (event) => {
            this.x = event.clientX;
            this.y = event.clientY;
        });

        document.addEventListener('mousedown', (event) => { 
            this.clickables.forEach((clickable) => {
                clickable[0].click(game);
            });
            this.holdables.forEach((holdable) => {
                holdable[0].mousedown(game, this.x, this.y);
            });
        });

        document.addEventListener('mouseup', (event) => {
            this.holdables.forEach((holdable) => {
                holdable[0].mouseup(game, this.x, this.y);
            });
        });

        document.addEventListener('wheel', (event) => {
            this.lastScrollX += event.deltaX;
            this.lastScrollY += event.deltaY;
        });
    }

    public registerClickable(clickable: Clickable, priority: number = 0): void {
        this.clickables.push([clickable, priority]);
        this.clickables.sort((a, b) => a[1] - b[1]);
    }

    public registerHoldable(holdable: Holdable, priority: number = 0): void {
        this.holdables.push([holdable, priority]);
        this.holdables.sort((a, b) => a[1] - b[1]);
    }

    public registerScrollable(scrollable: Scrollable, priority: number = 0): void {
        this.scrollables.push([scrollable, priority]);
        this.scrollables.sort((a, b) => a[1] - b[1]);
    }

    public removeClickable(clickable: Clickable): void {
        for (let i = 0; i < this.clickables.length; i++) {
            if (this.clickables[i][0] === clickable) {
                this.clickables.splice(i, 1);
                break;
            }
        }
    }

    public removeHoldable(holdable: Holdable): void {
        for (let i = 0; i < this.holdables.length; i++) {
            if (this.holdables[i][0] === holdable) {
                this.holdables.splice(i, 1);
                break;
            }
        }
    }

    public removeScrollable(scrollable: Scrollable): void {
        for (let i = 0; i < this.scrollables.length; i++) {
            if (this.scrollables[i][0] === scrollable) {
                this.scrollables.splice(i, 1);
                break;
            }
        }
    }

    public update(game: ColonyCraft): void {
        //perform an update on each button
        this.clickables.forEach((button) => {
            button[0].update(game, this.x, this.y);
        });
        this.holdables.forEach((button) => {
            button[0].update(game, this.x, this.y);
            button[0].mousetick(game, this.x, this.y);
        });
        this.scrollables.forEach((scrollable) => {
            scrollable[0].tick(game, this.x, this.y, this.lastScrollX, this.lastScrollY);
        });
        this.lastScrollX = 0;
        this.lastScrollY = 0;
    }
}