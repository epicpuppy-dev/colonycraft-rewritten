import { game } from "../../..";
import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class OverlayInventory extends Screen {
    private closeButton: Button;
    private rowScroll: number = 0;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("inventory"), 1);
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("inventory");
        });
        
        game.mouse.registerClickable(this.closeButton);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        const inventory = game.colony.inventory;

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
        game.draw.textCenter("Inventory", Math.floor(this.width / 2), Math.floor(this.height / 8 + 12), 28, "white");

        //Storage bar
        game.draw.sprite(ctx, "storage", Math.floor(this.width / 8 + 8), Math.floor(7 * this.height / 8 - 40), 32, 32);
        ctx.fillStyle = inventory.storageUsed < inventory.storageCapacity ? inventory.storageUsed < inventory.storageCapacity * 2 / 3 ? '#00ff00' : '#ffff00' : '#ff0000';
        ctx.fillRect(Math.floor(this.width / 8 + 48), Math.floor(7 * this.height / 8 - 18), Math.min((3 * this.width / 4 - 56) * (inventory.storageUsed / inventory.storageCapacity), (3 * this.width / 4 - 56)), 10);
        ctx.strokeStyle = '#555555';
        ctx.strokeRect(Math.floor(this.width / 8 + 48), Math.floor(7 * this.height / 8 - 18), Math.floor((3 * this.width / 4 - 56) * Math.min((inventory.storageCapacity / (inventory.storageUsed == 0 ? 1 : inventory.storageUsed)), 1)), 10);
        ctx.strokeStyle = '#777777';
        ctx.strokeRect(Math.floor(this.width / 8 + 48), Math.floor(7 * this.height / 8 - 18), Math.floor(3 * this.width / 4 - 56), 10);
        game.draw.text(`Storage: ${parseFloat(inventory.storageUsed.toFixed(1)).toLocaleString()} / ${parseInt(inventory.storageCapacity.toFixed(0)).toLocaleString()}`, Math.floor(this.width / 8 + 48), Math.floor(7 * this.height / 8 - 38), 14, "white");

        //Render the inventory itself
        /*
        each row of the inventory should be 16px tall with 4px padding between rows
        a section header should be centered and take up a whole row
        there should be two columns of items, each item entry is 1 row tall
        there will be a scroll bar on the right side of the inventory
        the scroll bar will scroll in increments of 1 row
        */

        const maxRows = Math.floor((3 * this.height / 4 - 104) / 20);
        let currentRow = 0;
        let currentColumn = 0;
        //find item with the most amount of items
        let maxItems = 0;
        for (let i = 0; i < Object.keys(inventory.items).length; i++) {
            if (inventory.items[Object.keys(inventory.items)[i]].amount > maxItems) maxItems = inventory.items[Object.keys(inventory.items)[i]].amount;
        }
        //get width of maxItems
        const maxwidth = game.draw.textWidth(`${maxItems.toLocaleString()}`, 14);

        //loop through all inventory categories
        for (let i = 0; i < Object.keys(inventory.categories).length; i++) {
            if (currentColumn > 0) {
                currentColumn = 0;
                currentRow++;
            }
            //check if any items in the category have an amount greater than 0
            let hasItems = false;
            for (let j = 0; j < inventory.categories[Object.keys(inventory.categories)[i]].items.length; j++) {
                if (inventory.categories[Object.keys(inventory.categories)[i]].items[j].amount > 0) {
                    hasItems = true;
                    break;
                }
            }
            //if the category has no items, skip it
            if (!hasItems) continue;
            //if the current row is greater than the scroll value and less than the max rows plus scroll value, render the category header
            if (currentRow >= this.rowScroll && currentRow < this.rowScroll + maxRows) {
                game.draw.textCenter(inventory.categories[Object.keys(inventory.categories)[i]].name, Math.floor(this.width / 2), Math.floor(this.height / 8 + 56 + 20 * (currentRow - this.rowScroll)), 14, "white");
                //add 1 rows for the category header
                currentRow++;
            }
            //loop through all items in the category
            for (let j = 0; j < inventory.categories[Object.keys(inventory.categories)[i]].items.length; j++) {
                //check if the current row is greater than the scroll value and less than the max rows plus scroll value
                if (currentRow >= this.rowScroll && currentRow < this.rowScroll + maxRows) {
                    //check if amount is greater than 0
                    if (!(inventory.categories[Object.keys(inventory.categories)[i]].items[j].amount > 0)) {
                        continue;
                    }

                    //render the item
                    game.draw.sprite(ctx, inventory.categories[Object.keys(inventory.categories)[i]].items[j].key + "Small", Math.floor(this.width / 8 + 8 + (3 * this.width / 8) * currentColumn), Math.floor(this.height / 8 + 56 + 20 * (currentRow - this.rowScroll)), 16, 16);
                    
                    const amountWidth = game.draw.textWidth(`${inventory.categories[Object.keys(inventory.categories)[i]].items[j].amount.toLocaleString()}`, 14);
                    const widthDiff = maxwidth - amountWidth;
                    game.draw.text(`${inventory.categories[Object.keys(inventory.categories)[i]].items[j].amount.toLocaleString()}x ${inventory.categories[Object.keys(inventory.categories)[i]].items[j].name}`, Math.floor(this.width / 8 + 30 + (3 * this.width / 8) * currentColumn) + widthDiff, Math.floor(this.height / 8 + 56 + 20 * (currentRow - this.rowScroll) + 1), 14, "white");
                    //add 1 row for the item
                    currentColumn++;
                    if (currentColumn > 1) {
                        currentColumn = 0;
                        currentRow++;
                    }
                }
            }
        }
        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("inventory");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}