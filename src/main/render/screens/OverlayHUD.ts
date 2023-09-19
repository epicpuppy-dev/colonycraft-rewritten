import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class OverlayHUD extends Screen {
    private inventoryButton: Button;

    constructor(width: number, height: number) {
        super(width, height, 0, 0);
        
        this.inventoryButton = new Button(100, -50, this.width - 200, 100, (game: typeof ColonyCraft) => {
            game.currentScreens.push("inventory");
        } , (game: typeof ColonyCraft) => {
            return game.currentScreens.includes("game") && !game.currentScreens.includes("inventory");
        });

        ColonyCraft.mouse.registerButton(this.inventoryButton);
    }

    public render(game: typeof ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.roundRect(100, -50, this.width - 200, 100, 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    public active(game: typeof ColonyCraft): boolean {
        return game.currentScreens.includes("game");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

}