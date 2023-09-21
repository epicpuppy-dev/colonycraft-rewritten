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
        const inventory = game.colony.inventory;

        ctx.beginPath();
        ctx.roundRect(100, -50, this.width - 200, 100, 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();
        //Render Date
        game.draw.textCenter(`${game.clock.season == 1 ? "Spring" : game.clock.season == 2 ? "Summer" : game.clock.season == 3 ? "Fall" : "Winter"} ${game.clock.day}, Year ${game.clock.year}`, Math.floor(this.width / 2), 10, 28, "white");

        //Draw Storage HUD
        game.draw.sprite(ctx, "storageSmall", 105, 4, 16, 16);
        ctx.fillStyle = inventory.storageUsed < inventory.storageCapacity ? inventory.storageUsed < inventory.storageCapacity * 2 / 3 ? '#00ff00' : '#ffff00' : '#ff0000';
        ctx.fillRect(126, 8, Math.min(98 * inventory.storageUsed / inventory.storageCapacity, 98), 8);
        ctx.strokeStyle = '#555555';
        ctx.strokeRect(126, 8, 98 * Math.min(inventory.storageCapacity / inventory.storageUsed, 1), 8);
        ctx.strokeStyle = '#777777';
        ctx.strokeRect(126, 8, 98, 8);

        //Draw Population HUD
        game.draw.sprite(ctx, "peopleSmall", 230, 4, 16, 16);
        game.draw.text(`${(game.colony.population.babies + game.colony.population.children + game.colony.population.adults + game.colony.population.seniors).toLocaleString()}`, 252, 6, 14, "white");

        game.draw.renderText(ctx);
    }

    public active(game: typeof ColonyCraft): boolean {
        return game.currentScreens.includes("game");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

}