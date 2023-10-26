import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class UIHUD extends Screen {
    private statsButton: Button;
    private menuButton: Button;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        
        this.statsButton = new Button(100, -50, this.width - 200, 100, (game: ColonyCraft) => {
            game.currentScreens.push("stats", "overlay");
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("game") && !game.currentScreens.includes("overlay");
        });

        this.menuButton = new Button(this.width - 100, 0, 100, 50, (game: ColonyCraft) => {
            game.currentScreens.push("pause", "overlay");
            game.simulation.toggleRunning(game, false);
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("game") && !game.currentScreens.includes("overlay");
        });

        game.mouse.registerClickable(this.statsButton);
        game.mouse.registerClickable(this.menuButton);
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
        game.draw.sprite(ctx, "storageSmall", 104, 4, 16, 16);
        const storageColor = inventory.storageUsed < inventory.storageCapacity ? inventory.storageUsed < inventory.storageCapacity * 2 / 3 ? '#00ff00' : '#ffff00' : '#ff0000';
        const preciseStorage = game.colony.research.technologies.storage1.unlocked;
        if (inventory.storageCapacity - inventory.storageUsed >= 0 && preciseStorage) game.draw.text(`${game.draw.toShortNumber(inventory.storageCapacity - inventory.storageUsed)}`, 124, 6, 14, storageColor);
        else if (preciseStorage) game.draw.text(`-${game.draw.toShortNumber(Math.abs(inventory.storageCapacity - inventory.storageUsed))}`, 124, 6, 14, storageColor);
        else game.draw.text(`${(inventory.storageUsed / inventory.storageCapacity) < 1 / 3 ? "A lot" : (inventory.storageUsed / inventory.storageCapacity) < 2 / 3 ? "Some" : (inventory.storageUsed / inventory.storageCapacity) < 1 ? "A little" : "None"}`, 124, 6, 14, storageColor);

        //Draw Land HUD
        game.draw.sprite(ctx, "landSmall", 104, 28, 16, 16);
        game.draw.text(`${game.draw.toShortNumber(game.colony.buildings.landMax - game.colony.buildings.landPending)}`, 124, 30, 14, "#ffffff");
        //game.draw.text(`2.22m`, 124, 30, 14, "#ffffff");

        //Draw Welfare HUD
        game.draw.sprite(ctx, "healthSmall", 200, 4, 16, 16);
        let healthR = Math.round(Math.min(0.5 - (game.colony.welfare.health - 0.5), 0.5) * 510).toString(16);
        if (healthR.length == 1) healthR = `0${healthR}`;
        let healthG = Math.min(Math.round(game.colony.welfare.health * 510), 255).toString(16);
        if (healthG.length == 1) healthG = `0${healthG}`;
        let healthColor = `#${healthR}${healthG}00`;
        game.draw.text(`${(game.colony.welfare.health * 100).toFixed(1)}%`, 220, 6, 14, healthColor);

        game.draw.sprite(ctx, "moraleSmall", 200, 28, 16, 16);
        let moraleR = Math.round(Math.min(0.5 - (game.colony.welfare.morale - 0.5), 0.5) * 510).toString(16);
        if (moraleR.length == 1) moraleR = `0${moraleR}`;
        let moraleG = Math.min(Math.round(game.colony.welfare.morale * 510), 255).toString(16);
        if (moraleG.length == 1) moraleG = `0${moraleG}`;
        let moraleColor = `#${moraleR}${moraleG}00`;
        game.draw.text(`${(game.colony.welfare.morale * 100).toFixed(1)}%`, 220, 30, 14, moraleColor);

        //Draw Population HUD
        game.draw.sprite(ctx, "peopleSmall", 296, 4, 16, 16);
        game.draw.text(`${game.draw.toShortNumber(game.colony.population.babies + game.colony.population.children + game.colony.population.adults + game.colony.population.seniors)}`, 316, 6, 14, "white");

        game.draw.sprite(ctx, "workersSmall", 296, 28, 16, 16)
        game.draw.text(`${game.draw.toShortNumber(game.colony.population.adults - game.colony.jobs.workersAssigned)}`, 316, 30, 14, "#6495ED");
        //game.draw.text(`1.11m`, 316, 30, 14, "#6495ED");

        //Draw Menu Button
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.roundRect(this.width - 65, 10, 30, 5, 3);
        ctx.roundRect(this.width - 65, 20, 30, 5, 3);
        ctx.roundRect(this.width - 65, 30, 30, 5, 3);
        ctx.fill();

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