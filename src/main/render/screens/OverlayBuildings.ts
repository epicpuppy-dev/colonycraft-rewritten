import { ColonyCraft } from "../../ColonyCraft";
import { Technology } from "../../content/colony/research/Technology";
import { KeyAction } from "../../player/KeyAction";
import { KeyBind } from "../../player/KeyBind";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ClickHandler } from "../ui/ClickHandler";

export class OverlayBuildings extends Screen {
    private closeButton: Button;
    private rowScroll: number = 0;
    private selectionClickable: ClickHandler;
    private rowScrol: number = 0;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("buildings"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("buildings");
        });

        this.selectionClickable = new ClickHandler(Math.floor(this.width / 8), Math.floor(this.height / 8), Math.floor(3 * this.width / 4), Math.floor(3 * this.height / 4), (game: ColonyCraft, x: number, y: number) => {
            
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("buildings");
        });
        
        game.mouse.registerClickable(this.closeButton);
        game.mouse.registerClickable(this.selectionClickable);
        
        game.key.addAction(new KeyAction("closeBuildings", "Close Buildings", (game: ColonyCraft) => {
            if (game.currentScreens.includes("buildings")) {
                game.currentScreens.splice(game.currentScreens.indexOf("buildings"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));
        game.draw.addCloseAction(game.key.actions.closeBuildings);

        game.key.addAction(new KeyAction("openBuildings", "Open Buildings", (game: ColonyCraft) => {
            if (game.currentScreens.includes("game") && !game.currentScreens.includes("overlay")) game.currentScreens.push("buildings", "overlay");
            else if (game.currentScreens.includes("buildings")) {
                game.currentScreens.splice(game.currentScreens.indexOf("buildings"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));

        game.key.addBinding(new KeyBind("Open Buildings", "B", "KeyB", [game.key.actions.openBuildings]));
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

        const maxRows = Math.floor((3 * this.height / 4 - 112) / 72);

        let currentRow = 0;
        let currentColumn = 0;

        for (let i = 0; i < buildings.buildingPriority.length; i++) {
            const building = buildings.buildings[buildings.buildingPriority[i]];
            if (!building.available(game)) continue;
            if (currentRow < this.rowScroll) {
                currentRow++;
                continue;
            }
            if (currentRow >= this.rowScroll && currentRow < maxRows + this.rowScroll) {
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