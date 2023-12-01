import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Tooltip } from "../tooltip/Tooltip";
import { Button } from "../ui/Button";

export class UIHUD extends Screen {
    private statsButton: Button;
    private menuButton: Button;
    private storageTooltip: Tooltip;
    private landTooltip: Tooltip;
    private healthTooltip: Tooltip;
    private moraleTooltip: Tooltip;
    private populationTooltip: Tooltip;
    private workersTooltip: Tooltip;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        
        this.statsButton = new Button(this.width - 152, 0, 52, 50, (game: ColonyCraft) => {
            game.currentScreens.push("stats", "overlay");
        }, (game, prevScreens) => {
            return prevScreens.includes("game") && !prevScreens.includes("overlay");
        });

        this.menuButton = new Button(this.width - 100, 0, 100, 50, (game: ColonyCraft) => {
            game.currentScreens.push("pause", "overlay");
            game.simulation.toggleRunning(game, false);
        }, (game, prevScreens) => {
            return prevScreens.includes("game") && !prevScreens.includes("overlay");
        });

        game.mouse.registerClickable(this.statsButton);
        game.mouse.registerClickable(this.menuButton);

        this.storageTooltip = new Tooltip(game, "storageTooltip", [
            {text: "Colony Storage", color: "#9d7955"},
            {text: "All resources are stored in the colony storage", color: "#ffffff"},
            {text: (game) => `Current Storage: ${game.draw.toShortNumber(game.colony.inventory.storageUsed)}/${game.draw.toShortNumber(game.colony.inventory.storageCapacity)}`, color: "#ffffff"},
            {text: (game) => `Storage is ${(game.colony.inventory.storageUsed / game.colony.inventory.storageCapacity * 100).toFixed(1)}% full`, color: "#ffffff"},
        ], 102, 2, 24 + game.draw.textWidth("2.22m/2.22m", 14), 20, (game) => game.currentScreens.includes("game") && !game.currentScreens.includes("overlay"), undefined, 0);

        this.landTooltip = new Tooltip(game, "landTooltip", [
            {text: "Colony Land", color: "#ffffff"},
            {text: "All buildings require land", color: "#ffffff"},
            {text: (game) => `Current Land: ${game.draw.toShortNumber(game.colony.buildings.landMax - game.colony.buildings.landPending)}/${game.draw.toShortNumber(game.colony.buildings.landMax)}`, color: "#ffffff"},
        ], 102, 26, 24 + game.draw.textWidth("2.22m/2.22m", 14), 20, (game) => game.currentScreens.includes("game") && !game.currentScreens.includes("overlay"), undefined, 0);

        this.healthTooltip = new Tooltip(game, "healthTooltip", [
            {text: "Colony Health", color: "#dc1414"},
            {text: "The overall health of your colony", color: "#ffffff"},
            {text: "Affects birth and death rates", color: "#ffffff"},
            {text: (game) => `Current death rate: ${(1 / game.colony.welfare.healthModifier * 100).toFixed(1)}% Current birth rate: ${(game.colony.welfare.healthModifier * 100).toFixed(1)}%`, color: "#ffffff"},
            {text: (game) => `All health loss is multiplied by ${(Math.max(0, Math.log(game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5) / Math.log(100) - (5 / (game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5))) * 100).toFixed(1)}% due to population`, color: "#ffff55"},
        ], Math.floor(this.width) - 236, 2, 24 + game.draw.textWidth("100.0%", 14), 20, (game) => game.currentScreens.includes("game") && !game.currentScreens.includes("overlay"), undefined, 0);

        this.moraleTooltip = new Tooltip(game, "moraleTooltip", [
            {text: "Colony Morale", color: "#dcd614"},
            {text: "The overall happiness of your colony", color: "#ffffff"},
            {text: (game) => `Affects work rate, currently: ${(game.colony.welfare.workModifier * 100).toFixed(1)}%`, color: "#ffffff"},
            {text: (game) => `All morale loss is multiplied by ${(Math.max(0, Math.log(game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5) / Math.log(100) - (5 / (game.colony.population.adults + game.colony.population.children / 2 + game.colony.population.seniors / 2 + game.colony.population.babies / 5))) * 100).toFixed(1)}% due to population`, color: "#ffff55"},
        ], Math.floor(this.width) - 236, 26, 24 + game.draw.textWidth("100.0%", 14), 20, (game) => game.currentScreens.includes("game") && !game.currentScreens.includes("overlay"), undefined, 0);

        this.populationTooltip = new Tooltip(game, "populationTooltip", [
            {text: "Colony Population", color: "#ffffff"},
            {text: "People in your colony progress through 4 stages of life:", color: "#ffffff"},
            {text: "Baby -> Child -> Adult -> Senior", color: "#ffffff"},
            {text: (game) => `Current Babies: ${game.colony.population.babies}`, color: "#98fb98"},
            {text: (game) => `Current Children: ${game.colony.population.children}`, color: "#48d1cc"},
            {text: (game) => `Current Adults: ${game.colony.population.adults}`, color: "#6495ed"},
            {text: (game) => `Current Seniors: ${game.colony.population.seniors}`, color: "#9370db"},
        ], Math.floor(this.width) - 378, 2, 24 + game.draw.textWidth("2.22m", 14), 20, (game) => game.currentScreens.includes("game") && !game.currentScreens.includes("overlay"), undefined, 0);

        this.workersTooltip = new Tooltip(game, "workersTooltip", [
            {text: "Colony Workers", color: "#6495ed"},
            {text: "The colony worker count is determined by the amount of adults", color: "#ffffff"},
            {text: (game) => `All workers are working at ${(game.colony.welfare.workModifier * 100).toFixed(1)}% speed due to morale`, color: "#ffffff"},
            {text: (game) => `Workers Total: ${game.colony.population.adults}`, color: "#ffffff"},
            {text: (game) => `Workers Unassigned: ${game.colony.population.adults - game.colony.jobs.workersAssigned}`, color: "#6495ed"},
        ], Math.floor(this.width) - 378, 26, 24 + game.draw.textWidth("2.22m/2.22m", 14), 20, (game) => game.currentScreens.includes("game") && !game.currentScreens.includes("overlay"), undefined, 0);

        game.draw.tooltip.addTooltip(this.storageTooltip);
        game.draw.tooltip.addTooltip(this.landTooltip);
        game.draw.tooltip.addTooltip(this.healthTooltip);
        game.draw.tooltip.addTooltip(this.moraleTooltip);
        game.draw.tooltip.addTooltip(this.populationTooltip);
        game.draw.tooltip.addTooltip(this.workersTooltip);
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
        game.draw.textCenter(`${game.clock.season == 1 ? "Spring" : game.clock.season == 2 ? "Summer" : game.clock.season == 3 ? "Autumn" : "Winter"} ${game.clock.day}, Year ${(game.clock.year).toLocaleString()}`, Math.floor(this.width / 2), 10, 28, "white");

        //Draw Storage HUD
        game.draw.sprite(ctx, "storageSmall", 104, 4, 16, 16);
        const storageColor = inventory.storageUsed < inventory.storageCapacity ? inventory.storageUsed < inventory.storageCapacity * 2 / 3 ? '#00ff00' : '#ffff00' : '#ff0000';
        const preciseStorage = true;
        game.draw.text(`${game.draw.toShortNumber(inventory.storageUsed)}/${game.draw.toShortNumber(inventory.storageCapacity)}`, 124, 6, 14, storageColor);

        //Draw Land HUD
        game.draw.sprite(ctx, "landSmall", 104, 28, 16, 16);
        game.draw.text(`${game.draw.toShortNumber(game.colony.buildings.landMax - game.colony.buildings.landPending)}/${game.draw.toShortNumber(game.colony.buildings.landMax)}`, 124, 30, 14, "#ffffff");
        //game.draw.text(`2.22m/2.22m`, 124, 30, 14, "#ffffff");

        //Draw Welfare HUD
        game.draw.sprite(ctx, "healthSmall", Math.floor(this.width) - 234, 4, 16, 16);
        let healthR = Math.round(Math.min(0.5 - (game.colony.welfare.health - 0.5), 0.5) * 510).toString(16);
        if (healthR.length == 1) healthR = `0${healthR}`;
        let healthG = Math.min(Math.round(game.colony.welfare.health * 510), 255).toString(16);
        if (healthG.length == 1) healthG = `0${healthG}`;
        let healthColor = `#${healthR}${healthG}00`;
        game.draw.text(`${(game.colony.welfare.health * 100).toFixed(1)}%`, Math.floor(this.width) - 214, 6, 14, healthColor);

        game.draw.sprite(ctx, "moraleSmall", Math.floor(this.width) - 234, 28, 16, 16);
        let moraleR = Math.round(Math.min(0.5 - (game.colony.welfare.morale - 0.5), 0.5) * 510).toString(16);
        if (moraleR.length == 1) moraleR = `0${moraleR}`;
        let moraleG = Math.min(Math.round(game.colony.welfare.morale * 510), 255).toString(16);
        if (moraleG.length == 1) moraleG = `0${moraleG}`;
        let moraleColor = `#${moraleR}${moraleG}00`;
        game.draw.text(`${(game.colony.welfare.morale * 100).toFixed(1)}%`, Math.floor(this.width) - 214, 30, 14, moraleColor);

        //Draw Population HUD
        game.draw.sprite(ctx, "peopleSmall", Math.floor(this.width) - 376, 4, 16, 16);
        game.draw.text(`${game.draw.toShortNumber(game.colony.population.babies + game.colony.population.children + game.colony.population.adults + game.colony.population.seniors)}`, Math.floor(this.width) - 356, 6, 14, "white");

        game.draw.sprite(ctx, "workersSmall", Math.floor(this.width) - 376, 28, 16, 16)
        game.draw.text(`${game.draw.toShortNumber(game.colony.population.adults - game.colony.jobs.workersAssigned)}/${game.draw.toShortNumber(game.colony.population.adults)}`, Math.floor(this.width) - 356, 30, 14, "#6495ED");
        //game.draw.text(`1.11m/1.11m`, Math.floor(this.width) - 356, 30, 14, "#6495ED");

        //Draw Stats Icon
        game.draw.sprite(ctx, "stats", Math.floor(game.width - 142), 8, 32, 32);

        //Draw Menu Button
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.roundRect(this.width - 40, 10, 30, 5, 3);
        ctx.roundRect(this.width - 40, 20, 30, 5, 3);
        ctx.roundRect(this.width - 40, 30, 30, 5, 3);
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