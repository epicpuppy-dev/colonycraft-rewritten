import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class UIHUD extends Screen {
    private inventoryButton: Button;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        
        this.inventoryButton = new Button(100, -50, this.width - 200, 100, (game: ColonyCraft) => {
            game.currentScreens.push("inventory");
        } , (game: ColonyCraft) => {
            return game.currentScreens.includes("game") && !game.currentScreens.includes("inventory") && !game.currentScreens.includes("research");
        });

        game.mouse.registerClickable(this.inventoryButton);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        const inventory = game.colony.inventory;

        ctx.beginPath();
        ctx.roundRect(100, -50, this.width - 200, 100, 10);
        ctx.fillStyle = "#333333";
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
        game.draw.sprite(ctx, "peopleSmall", 320, 4, 16, 16);
        game.draw.text(`${game.draw.toShortNumber(game.colony.population.babies + game.colony.population.children + game.colony.population.adults + game.colony.population.seniors)}`, 342, 6, 14, "white");

        game.draw.sprite(ctx, "workersSmall", 320, 28, 16, 16)
        game.draw.text(`${game.draw.toShortNumber(game.colony.jobs.workersAssigned)}/${game.draw.toShortNumber(game.colony.population.adults)}`, 342, 30, 14, "#6495ED");

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("game");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

}