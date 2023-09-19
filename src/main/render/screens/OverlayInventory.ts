import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class OverlayInventory extends Screen {
    private closeButton: Button;

    constructor(width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24, (game: typeof ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("inventory"), 1);
        }, (game: typeof ColonyCraft) => {
            return game.currentScreens.includes("inventory");
        });
        
        ColonyCraft.mouse.registerButton(this.closeButton);
    }

    public render(game: typeof ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.fillStyle = '#00000077';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 8), Math.floor(this.height / 8), Math.floor(3 * this.width / 4), Math.floor(3 * this.height / 4), 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();
        game.draw.sprite(ctx, "close", Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24);
        game.draw.textCenter(ctx, "Inventory", Math.floor(this.width / 2), Math.floor(this.height / 8 + 14), 28, "white");
    }

    public active(game: typeof ColonyCraft): boolean {
        return game.currentScreens.includes("inventory");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}