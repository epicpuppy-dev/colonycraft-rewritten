import { ColonyCraft } from "../../ColonyCraft";
import { KeyAction } from "../../player/KeyAction";
import { KeyBind } from "../../player/KeyBind";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ScrollBar } from "../ui/ScrollBar";
import { Slider } from "../ui/Slider";

export class OverlayInventory extends Screen {
    private closeButton: Button;
    private scrollBar: ScrollBar;
    private rowScroll: number = 0;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("inventory"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("inventory");
        });

        game.mouse.registerClickable(this.closeButton);

        game.key.addAction(new KeyAction("closeInventory", "Close Inventory", (game: ColonyCraft) => {
            if (game.currentScreens.includes("inventory")) {
                game.currentScreens.splice(game.currentScreens.indexOf("inventory"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));
        game.draw.addCloseAction(game.key.actions.closeInventory);

        game.key.addAction(new KeyAction("openInventory", "Open Inventory", (game: ColonyCraft) => {
            if (game.currentScreens.includes("game") && !game.currentScreens.includes("overlay")) game.currentScreens.push("inventory", "overlay");
            else if (game.currentScreens.includes("inventory")) {
                game.currentScreens.splice(game.currentScreens.indexOf("inventory"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));

        game.key.addBinding(new KeyBind("Open Inventory", "I", "KeyI", [game.key.actions.openInventory]));

        this.scrollBar = new ScrollBar(game, Math.floor(7 * this.width / 8 - 24), Math.floor(this.height / 8 + 56), 16, Math.floor(3 * this.height / 4 - 104), "v", 0, 5, 5, 24, (game) => game.currentScreens.includes("inventory"));
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        const inventory = game.colony.inventory;
        const preciseInventory = game.colony.research.technologies.storage1.unlocked;

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
        let barWidth = preciseInventory ? (3 * this.width / 4 - 56) * Math.min((inventory.storageUsed / inventory.storageCapacity), 1) : Math.floor(3 * this.width / 4 - 56);
        ctx.fillRect(Math.floor(this.width / 8 + 48), Math.floor(7 * this.height / 8 - 18), barWidth, 10);
        ctx.strokeStyle = '#555555';
        if (preciseInventory) ctx.strokeRect(Math.floor(this.width / 8 + 48), Math.floor(7 * this.height / 8 - 18), Math.floor((3 * this.width / 4 - 56) * Math.min((inventory.storageCapacity / (inventory.storageUsed == 0 ? 1 : inventory.storageUsed)), 1)), 10);
        ctx.strokeStyle = '#777777';
        ctx.strokeRect(Math.floor(this.width / 8 + 48), Math.floor(7 * this.height / 8 - 18), Math.floor(3 * this.width / 4 - 56), 10);
        let filled = inventory.storageUsed / inventory.storageCapacity;
        if (preciseInventory) game.draw.text(`Storage: ${game.draw.toShortNumber(inventory.storageUsed)} / ${game.draw.toShortNumber(inventory.storageCapacity)}`, Math.floor(this.width / 8 + 48), Math.floor(7 * this.height / 8 - 38), 14, "white");
        else game.draw.text(`Storage: ${filled < 1 / 3 ? "A lot" : filled < 2 / 3 ? "Some" : filled < 1 ? "A little" : "None"} left`, Math.floor(this.width / 8 + 48), Math.floor(7 * this.height / 8 - 38), 14, "white");

        //Render the inventory itself
        /*
        each row of the inventory should be 16px tall with 4px padding between rows
        a section header should be centered and take up a whole row
        there should be two columns of items, each item entry is 1 row tall
        there will be a scroll bar on the right side of the inventory
        the scroll bar will scroll in increments of 1 row
        */

        this.rowScroll = Math.max(this.scrollBar.value, 0);

        const maxRows = Math.floor((3 * this.height / 4 - 104) / 20);
        let currentRow = 0;
        let currentColumn = 0;
        //find item with the most amount of items
        let maxItems = 0;
        for (let i = 0; i < Object.keys(inventory.items).length; i++) {
            if (inventory.items[Object.keys(inventory.items)[i]].amount > maxItems) maxItems = inventory.items[Object.keys(inventory.items)[i]].amount;
        }
        //get width of maxItems
        let maxwidth = game.draw.textWidth(`${game.draw.toShortNumber(maxItems)}`, 14);
        if (!preciseInventory) {
            maxwidth = game.draw.textWidth('Many', 14);
        }

        //loop through all inventory categories
        for (let i = 0; i < Object.keys(inventory.categories).length; i++) {
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

            if (currentRow >= this.rowScroll && currentRow < this.rowScroll + maxRows) {
                game.draw.textCenter(`- ${inventory.categories[Object.keys(inventory.categories)[i]].name} -`, Math.floor(this.width / 2), Math.floor(this.height / 8 + 56 + 20 * (currentRow - this.rowScroll)), 14, "white");
            }
            //add 1 rows for the category header
            currentRow++;
            currentColumn = 0;
            //loop through all items in the category
            for (let j = 0; j < inventory.categories[Object.keys(inventory.categories)[i]].items.length; j++) {
                //check if amount is greater than 0
                if (!(inventory.categories[Object.keys(inventory.categories)[i]].items[j].amount > 0)) {
                    continue;
                }

                if (currentRow >= this.rowScroll && currentRow < this.rowScroll + maxRows) {
                    //render the item
                    game.draw.sprite(ctx, inventory.categories[Object.keys(inventory.categories)[i]].items[j].key + "Small", Math.floor(this.width / 8 + 8 + (3 * this.width / 8) * currentColumn), Math.floor(this.height / 8 + 56 + 20 * (currentRow - this.rowScroll)), 16, 16);

                    let amount = inventory.categories[Object.keys(inventory.categories)[i]].items[j].amount;
                    const amountWidth = game.draw.textWidth(`${preciseInventory ? game.draw.toShortNumber(amount) : amount < 100 ? "Few" : amount < 1000 ? "Some" : "Many"}`, 14);
                    const widthDiff = maxwidth - amountWidth;
                    game.draw.text(`${preciseInventory ? game.draw.toShortNumber(amount) : amount < 100 ? "Few" : amount < 1000 ? "Some" : "Many"} ${inventory.categories[Object.keys(inventory.categories)[i]].items[j].name}`, Math.floor(this.width / 8 + 30 + (3 * this.width / 8) * currentColumn) + widthDiff, Math.floor(this.height / 8 + 56 + 20 * (currentRow - this.rowScroll) + 1), 14, "white");

                }
                currentColumn++;
                if (currentColumn > 1) {
                    currentColumn = 0;
                    currentRow++;
                }
            }
            if (currentColumn > 0) {
                currentColumn = 0;
                currentRow++;
            }
        }

        this.scrollBar.setBounds(this.rowScroll, maxRows, Math.floor(currentRow - maxRows));
        this.scrollBar.render(ctx);

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