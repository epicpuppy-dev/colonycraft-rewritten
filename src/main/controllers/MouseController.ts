import { ColonyCraft } from "../ColonyCraft";
import { Button } from "../render/ui/Button";

export class MouseController {
    public x: number = 0;
    public y: number = 0;
    private buttons: Button[] = [];

    constructor() {
        document.addEventListener('mousemove', (event) => {
            this.x = event.clientX;
            this.y = event.clientY;
        });

        document.addEventListener('mousedown', (event) => { 
            this.buttons.forEach((button) => {
                button.click(ColonyCraft);
            });
        });
    }

    public registerButton(button: Button): void {
        this.buttons.push(button);
    }

    public update(): void {
        //perform an update on each button
        this.buttons.forEach((button) => {
            button.update(ColonyCraft, this.x, this.y);
        });
    }
}