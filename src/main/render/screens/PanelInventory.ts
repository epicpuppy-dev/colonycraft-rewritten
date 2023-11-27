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
            return game.currentScreens.includes("game") && !game.currentScreens.includes("overlay");
        });

        game.mouse.registerClickable(this.inventoryButton);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.roundRect(-50, 364, Math.floor(this.width / 3 + 50), 80, 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();

        const inventory = game.colony.inventory;
        const welfare = game.colony.welfare;
        const storageColor = inventory.storageUsed < inventory.storageCapacity ? inventory.storageUsed < inventory.storageCapacity * 2 / 3 ? '#55ff55' : '#ffff55' : '#ff5555';
        game.draw.textCenter(`Storage is ${(inventory.storageUsed / inventory.storageCapacity * 100).toFixed(1)}% full`, Math.floor(this.width / 6), 376, 14, storageColor);

        let consumption = Math.ceil(game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5);
        if (welfare.foodSatisfaction == 1) {
            game.draw.textCenter(`${game.draw.toShortNumber(inventory.foodTotal / consumption)} days of food in storage`, Math.floor(this.width / 6), 396, 14, inventory.foodTotal / consumption > 1 ? inventory.foodTotal / consumption > 10 ? "#ff5555" : "#ffff55" : "#ffaa55");
        } else {
            game.draw.textCenter(`Only ${Math.floor(welfare.foodSatisfaction * 100)}% of food was provided today`, Math.floor(this.width / 6), 396, 14, `#ff5555`);
        }
        if (welfare.fluidSatisfaction == 1) {
            game.draw.textCenter(`${game.draw.toShortNumber(inventory.fluidTotal / consumption)} days of water in storage`, Math.floor(this.width / 6), 416, 14, inventory.fluidTotal / consumption > 1 ? inventory.foodTotal / consumption > 10 ? "#ff5555" : "#ffff55" : "#ffaa55");
        } else {
            game.draw.textCenter(`Only ${Math.floor(welfare.fluidSatisfaction * 100)}% of water was provided today`, Math.floor(this.width / 6), 416, 14, `#ff5555`);
        }
        
        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("game");
    }

    public resize(width: number, height: number): void {
        this.inventoryButton.reposition(0, 50, Math.floor(width / 3), 80);
    }

}