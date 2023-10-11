import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class UIHUD extends Screen {
    private inventoryButton: Button;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        
        this.inventoryButton = new Button(100, -50, this.width - 200, 100, (game: ColonyCraft) => {
            game.currentScreens.push("inventory", "overlay");
        } , (game: ColonyCraft) => {
            return game.currentScreens.includes("game") && !game.currentScreens.includes("overlay");
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
        ctx.fillRect(126, 8, Math.min(108 * inventory.storageUsed / inventory.storageCapacity, 108), 8);
        ctx.strokeStyle = '#555555';
        ctx.strokeRect(126, 8, 108 * Math.min(inventory.storageCapacity / inventory.storageUsed, 1), 8);
        ctx.strokeStyle = '#777777';
        ctx.strokeRect(126, 8, 108, 8);

        //Draw Land HUD
        game.draw.sprite(ctx, "landSmall", 105, 28, 16, 16);
        game.draw.text(`${game.draw.toShortNumber(game.colony.buildings.landPending)}/${game.draw.toShortNumber(game.colony.buildings.landMax)}`, 125, 30, 14, "#ffffff");

        //Draw Welfare HUD
        game.draw.sprite(ctx, "healthSmall", 240, 4, 16, 16);
        let healthR = Math.round(Math.min(0.5 - (game.colony.welfare.health - 0.5), 0.5) * 510).toString(16);
        if (healthR.length == 1) healthR = `0${healthR}`;
        let healthG = Math.min(Math.round(game.colony.welfare.health * 510), 255).toString(16);
        if (healthG.length == 1) healthG = `0${healthG}`;
        let healthColor = `#${healthR}${healthG}00`;
        game.draw.text(`${(game.colony.welfare.health * 100).toFixed(1)}%`, 260, 6, 14, healthColor);

        game.draw.sprite(ctx, "moraleSmall", 240, 28, 16, 16);
        let moraleR = Math.round(Math.min(0.5 - (game.colony.welfare.morale - 0.5), 0.5) * 510).toString(16);
        if (moraleR.length == 1) moraleR = `0${moraleR}`;
        let moraleG = Math.min(Math.round(game.colony.welfare.morale * 510), 255).toString(16);
        if (moraleG.length == 1) moraleG = `0${moraleG}`;
        let moraleColor = `#${moraleR}${moraleG}00`;
        game.draw.text(`${(game.colony.welfare.morale * 100).toFixed(1)}%`, 260, 30, 14, moraleColor);

        //Draw Population HUD
        game.draw.sprite(ctx, "peopleSmall", 330, 4, 16, 16);
        game.draw.text(`${game.draw.toShortNumber(game.colony.population.babies + game.colony.population.children + game.colony.population.adults + game.colony.population.seniors)}`, 350, 6, 14, "white");

        game.draw.sprite(ctx, "workersSmall", 330, 28, 16, 16)
        game.draw.text(`${game.draw.toShortNumber(game.colony.jobs.workersAssigned)}/${game.draw.toShortNumber(game.colony.population.adults)}`, 350, 30, 14, "#6495ED");

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