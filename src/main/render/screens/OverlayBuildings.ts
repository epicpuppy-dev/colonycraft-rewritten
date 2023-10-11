import { ColonyCraft } from "../../ColonyCraft";
import { Building } from "../../content/colony/buildings/Building";
import { KeyAction } from "../../player/KeyAction";
import { KeyBind } from "../../player/KeyBind";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ClickHandler } from "../ui/ClickHandler";

export class OverlayBuildings extends Screen {
    private increaseIndex: number = 0;
    private increaseSteps: [number, string][] = [[1, "1"], [10, "10"], [100, "100"], [1000, "1k"], [10000, "10k"], [100000, "100k"], [1000000, "1m"], [10000000, "10m"], [100000000, "100m"], [1000000000, "1b"]];
    private closeButton: Button;
    private rowScroll: number = 0;
    private selectionClickable: ClickHandler;
    private buildingsAvailable: Building[] = [];
    private selected: Building | null = null;
    private plusButton: Button;
    private minusButton: Button;
    private buildButton: Button;
    private demolishButton: Button;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("buildings"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            this.selected = null;
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("buildings");
        });

        this.selectionClickable = new ClickHandler(Math.floor(this.width / 8), Math.floor(this.height / 8), Math.floor(3 * this.width / 4), Math.floor(3 * this.height / 4), (game: ColonyCraft, x: number, y: number) => {
            if ((y - this.height / 8 - 112) % 72 > 52) return;
            const row = Math.floor((y - this.height / 8 - 112) / 72);
            if ((x - this.width / 8 -10) % (this.width / 4) > (this.width / 4 - 20)) return;
            const column = x < 3 * this.width / 8 ? 0 : x < 5 * this.width / 8 ? 1 : 2;
            const index = row * 3 + column + (this.selected != null ? -9 : 0);
            if (index >= this.buildingsAvailable.length || index < 0) return;
            this.selected = this.buildingsAvailable[index];
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("buildings");
        });
        
        game.mouse.registerClickable(this.selectionClickable, -10);
        game.mouse.registerClickable(this.closeButton);
        
        game.key.addAction(new KeyAction("closeBuildings", "Close Buildings", (game: ColonyCraft) => {
            if (game.currentScreens.includes("buildings")) {
                game.currentScreens.splice(game.currentScreens.indexOf("buildings"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
                this.selected = null;
            }
        }));
        game.draw.addCloseAction(game.key.actions.closeBuildings);

        game.key.addAction(new KeyAction("openBuildings", "Open Buildings", (game: ColonyCraft) => {
            if (game.currentScreens.includes("game") && !game.currentScreens.includes("overlay")) game.currentScreens.push("buildings", "overlay");
            else if (game.currentScreens.includes("buildings")) {
                game.currentScreens.splice(game.currentScreens.indexOf("buildings"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
                this.selected = null;
            }
        }));

        game.key.addBinding(new KeyBind("Open Buildings", "B", "KeyB", [game.key.actions.openBuildings]));
    
        this.plusButton = new Button(Math.floor(this.width / 2) + 38, Math.floor(this.height / 8 + 272), 21, 21, () => {
            this.increaseIndex = Math.min(this.increaseSteps.length - 1, this.increaseIndex + 1);
        }, (game) => game.currentScreens.includes("buildings"));

        this.minusButton = new Button(Math.floor(this.width / 2) - 62, Math.floor(this.height / 8 + 272), 21, 21, () => {
            this.increaseIndex = Math.max(0, this.increaseIndex - 1);
        }, (game) => game.currentScreens.includes("buildings"));

        this.buildButton = new Button(Math.floor(this.width / 2 + 100), Math.floor(this.height / 8 + 270), 200, 26, () => {
            if (this.selected == null) return;
            game.colony.buildings.queueBuilding(game, this.selected, this.increaseSteps[this.increaseIndex][0]);
        }, (game) => game.currentScreens.includes("buildings"));

        this.demolishButton = new Button(Math.floor(this.width / 2 - 300), Math.floor(this.height / 8 + 270), 200, 26, () => {
            if (this.selected == null) return;
            game.colony.buildings.queueBuilding(game, this.selected, -this.increaseSteps[this.increaseIndex][0]);
        }, (game) => game.currentScreens.includes("buildings"));

        game.mouse.registerClickable(this.plusButton, -20);
        game.mouse.registerClickable(this.minusButton, -20);
        game.mouse.registerClickable(this.buildButton, -20);
        game.mouse.registerClickable(this.demolishButton, -20);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        const buildings = game.colony.buildings;

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
        game.draw.textCenter("Buildings", Math.floor(this.width / 2), Math.floor(this.height / 8 + 12), 28, "white");

        game.draw.textCenter(`Land: ${game.draw.toShortNumber(buildings.landUsed)}/${game.draw.toShortNumber(buildings.landPending)}/${game.draw.toShortNumber(buildings.landMax)}`, Math.floor(this.width / 2), Math.floor(this.height / 8 + 56), 14, "white");
        game.draw.textCenter(`${game.draw.toShortNumber(buildings.queueSize)} building${buildings.queueSize != 1 ? "s" : ""} in construction (${game.draw.toShortNumber(buildings.workLeft)} work effort left)`, Math.floor(this.width / 2), Math.floor(this.height / 8 + 76), 14, "white");

        if (this.selected != null) {
            ctx.strokeRect(Math.floor(this.width / 8 + 10), Math.floor(this.height / 8 + 108), Math.floor(3 * this.width / 4 - 20), 194);
            game.draw.textCenter(this.selected.name, Math.floor(this.width / 2), Math.floor(this.height / 8 + 116), 14, "white");
            game.draw.textCenter(`Built: ${this.selected.amount}   Target: ${this.selected.target}   Max: ${this.selected.maximum(game)}`, Math.floor(this.width / 2), Math.floor(this.height / 8 + 136), 14, "white");
            
            //description and cost
            let descRow = 1;
            game.draw.textSmallCenter("Cost:", Math.floor(this.width / 2), Math.floor(this.height / 8 + 158), 7, "#FFFFFF");
            if (this.selected.cost.length == 0) game.draw.textSmallCenter("Free", Math.floor(this.width / 2), Math.floor(this.height / 8 + 168), 7, "#FFFFFF");
            else {
                let costColumns = 1;
                let costRows = this.selected.cost.length;
                while (costRows > 4) {
                    costColumns++;
                    costRows = Math.ceil(this.selected.cost.length / costColumns);
                }
                let costCurrentColumn = 0;
                for (let i = 0; i < this.selected.cost.length; i++) {
                    const cost = this.selected.cost[i];
                    game.draw.textSmallCenter(`${game.draw.toShortNumber(cost.amount)} ${cost.item.name} (${game.draw.toShortNumber(cost.item.amount)})`, Math.floor(this.width / 2 - (costColumns - 1) * 50 + costCurrentColumn * 100), Math.floor(this.height / 8 + 158 + 10 * descRow), 7, cost.item.amount >= cost.amount ? "#FFFFFF" : "#FF5555");
                    if (++costCurrentColumn >= costColumns) {
                        costCurrentColumn = 0;
                        descRow++;
                    }
                }
                if (costCurrentColumn != 0) descRow++;
            }

            for (let i = 0; i < this.selected.desc.length; i++) {
                game.draw.textSmallCenter(this.selected.desc[i], Math.floor(this.width / 2), Math.floor(this.height / 8 + 168 + 10 * descRow), 7, "#FFFFFF");
                descRow++;
            }

            game.draw.textSmallCenter("Modify By:", Math.floor(this.width / 2), Math.floor(this.height / 8 + 270), 7, "#FFFFFF");
            game.draw.textCenter(this.increaseSteps[this.increaseIndex][1], Math.floor(this.width / 2), Math.floor(this.height / 8 + 282), 14, "#FFFFFF");
            ctx.beginPath();
            ctx.roundRect(Math.floor(this.width / 2) - 62, Math.floor(this.height / 8 + 272), 21, 21, 3);
            ctx.roundRect(Math.floor(this.width / 2) + 38, Math.floor(this.height / 8 + 272), 21, 21, 3);
            ctx.stroke();
            game.draw.textCenter("+", Math.floor(this.width / 2) + 50, Math.floor(this.height / 8 + 272), 21, "#FFFFFF");
            game.draw.textCenter("-", Math.floor(this.width / 2) - 50, Math.floor(this.height / 8 + 272), 21, "#FFFFFF");

            //draw build and demolish buttons
            game.draw.textCenter("Build", Math.floor(this.width / 2 + 200), Math.floor(this.height / 8 + 276), 14, "#FFFFFF");
            game.draw.textCenter("Demolish", Math.floor(this.width / 2 - 200), Math.floor(this.height / 8 + 276), 14, "#FFFFFF");
            ctx.beginPath();
            ctx.roundRect(Math.floor(this.width / 2 + 100), Math.floor(this.height / 8 + 270), 200, 26, 3);
            ctx.roundRect(Math.floor(this.width / 2 - 300), Math.floor(this.height / 8 + 270), 200, 26, 3);
            ctx.stroke();
        }
        
        const maxRows = Math.floor((3 * this.height / 4 - 112) / 72);

        let currentRow = this.selected != null ? 3 : 0;
        let currentColumn = 0;
        this.buildingsAvailable = [];

        for (let i = 0; i < buildings.buildingPriority.length; i++) {
            const building = buildings.buildings[buildings.buildingPriority[i]];
            if (!building.available(game)) continue;
            if (building === this.selected) continue;
            if (currentRow >= this.rowScroll && currentRow < maxRows + this.rowScroll) {
                this.buildingsAvailable.push(building);
                ctx.strokeRect(Math.floor(this.width / 8 + currentColumn * this.width / 4 + 10), Math.floor(this.height / 8 + 108 + currentRow * 72), Math.floor(this.width / 4 - 20), 52);
                game.draw.textCenter(building.name, Math.floor(this.width / 8 + currentColumn * this.width / 4 + this.width / 8), Math.floor(this.height / 8 + 116 + currentRow * 72), 14, "white");
                game.draw.textCenter(`${building.amount}/${building.target}/${building.maximum(game)}`, Math.floor(this.width / 8 + currentColumn * this.width / 4 + this.width / 8), Math.floor(this.height / 8 + 136 + currentRow * 72), 14, "white");
            }
            currentColumn++;
            if (currentColumn > 2) {
                currentColumn = 0;
                currentRow++;
            }
        }

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("buildings");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}