import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class PanelInventory extends Screen {
    private inventoryButton: Button;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.inventoryButton = new Button(0, 364, Math.floor(width / 3), 50, (game: ColonyCraft) => {
            game.currentScreens.push("inventory", "overlay");
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("game") && !game.currentScreens.includes("overlay") && game.colony.research.technologies.storage1.unlocked;
        });

        game.mouse.registerClickable(this.inventoryButton);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        if (!game.colony.research.technologies.storage1.unlocked) return;

        ctx.beginPath();
        ctx.roundRect(-50, 364, Math.floor(this.width / 3 + 50), 40, 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();

        const inventory = game.colony.inventory;
        const storageColor = inventory.storageUsed < inventory.storageCapacity ? inventory.storageUsed < inventory.storageCapacity * 2 / 3 ? '#99ff99' : '#ffff99' : '#ff9999';
        game.draw.textCenter(`Storage is ${(inventory.storageUsed / inventory.storageCapacity * 100).toFixed(1)}% full`, Math.floor(this.width / 6), 376, 14, storageColor);

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("game");
    }

    public resize(width: number, height: number): void {
        this.inventoryButton.reposition(0, 50, Math.floor(width / 3), 80);
    }

}