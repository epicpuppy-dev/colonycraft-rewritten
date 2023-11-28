import { ColonyCraft } from "../../ColonyCraft";
import { KeyAction } from "../../player/KeyAction";
import { KeyBind } from "../../player/KeyBind";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ClickHandler } from "../ui/ClickHandler";
import { ScrollBar } from "../ui/ScrollBar";

export class OverlayInventory extends Screen {
    private increaseIndex: number = 0;
    private increaseSteps: [number, string][] = [[1, "1"], [10, "10"], [100, "100"], [1000, "1k"], [10000, "10k"], [100000, "100k"], [1000000, "1m"], [10000000, "10m"], [100000000, "100m"], [1000000000, "1b"]];
    private closeButton: Button;
    private scrollBar: ScrollBar;
    private rowScroll: number = 0;
    private plusButton: Button;
    private minusButton: Button;
    private itemsAvailable: (string | null)[] = [];
    private maxPlusClickable: ClickHandler;
    private maxMinusClickable: ClickHandler;
    private minPlusClickable: ClickHandler;
    private minMinusClickable: ClickHandler;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("inventory"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("inventory");
        });

        game.mouse.registerClickable(this.closeButton);

        game.key.addAction(new KeyAction("closeInventory", "Close Inventory", (game, prevScreens) => {
            if (prevScreens.includes("inventory")) {
                game.currentScreens.splice(game.currentScreens.indexOf("inventory"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));
        game.draw.addCloseAction(game.key.actions.closeInventory);

        game.key.addAction(new KeyAction("openInventory", "Open Inventory", (game, prevScreens) => {
            if (prevScreens.includes("game") && !prevScreens.includes("overlay")) game.currentScreens.push("inventory", "overlay");
            else if (prevScreens.includes("inventory")) {
                game.currentScreens.splice(game.currentScreens.indexOf("inventory"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));

        game.key.addBinding(new KeyBind("Open Inventory", "I", "KeyI", [game.key.actions.openInventory]));

        const maxRows = Math.floor((3 * this.height / 4 - 104) / 22);
        const textOffset = game.draw.textWidth("2.22m", 14);

        this.plusButton = new Button(Math.floor(7 * this.width / 8 - 28 - textOffset * 4.25) + 38, Math.floor(this.height / 8 + 15), 21, 21, () => {
            this.increaseIndex = Math.min(this.increaseSteps.length - 1, this.increaseIndex + 1);
        }, (game) => game.currentScreens.includes("inventory"));
        this.minusButton = new Button(Math.floor(7 * this.width / 8 - 28 - textOffset * 4.25) - 62, Math.floor(this.height / 8 + 15), 21, 21, () => {
            this.increaseIndex = Math.max(0, this.increaseIndex - 1);
        }, (game) => game.currentScreens.includes("inventory"));
        this.maxPlusClickable = new ClickHandler(0, Math.floor(this.height / 8 + 56), this.width, 22 + 22 * maxRows, (game, x, y) => {
            if (x < Math.floor(7 * this.width / 8 - 29 - textOffset * 3) + 30 || x > Math.floor(7 * this.width / 8 - 29 - textOffset * 3) + 48) return;
            const yRelative = Math.floor(y - this.height / 8 - 56);
            const yLeft = yRelative % 22;
            if (yLeft > 18) return;
            const row = Math.floor(yRelative / 22);
            if (row > this.itemsAvailable.length - 1) return;
            const item = this.itemsAvailable[row];
            if (item != null) game.colony.inventory.items[item].max += this.increaseSteps[this.increaseIndex][0];
        }, (game) => game.currentScreens.includes("inventory"));
        this.maxMinusClickable = new ClickHandler(0, Math.floor(this.height / 8 + 56), this.width, 22 + 22 * maxRows, (game, x, y) => {
            if (x < Math.floor(7 * this.width / 8 - 29 - textOffset * 3) - 50 || x > Math.floor(7 * this.width / 8 - 29 - textOffset * 3) - 32) return;
            const yRelative = Math.floor(y - this.height / 8 - 56);
            const yLeft = yRelative % 22;
            if (yLeft > 18) return;
            const row = Math.floor(yRelative / 22);
            if (row > this.itemsAvailable.length - 1) return;
            const item = this.itemsAvailable[row];
            if (item != null) game.colony.inventory.items[item].max = Math.max(game.colony.inventory.items[item].max - this.increaseSteps[this.increaseIndex][0], 0);
        }, (game) => game.currentScreens.includes("inventory"));
        this.minPlusClickable = new ClickHandler(0, Math.floor(this.height / 8 + 56), this.width, 22 + 22 * maxRows, (game, x, y) => {
            if (x < Math.floor(7 * this.width / 8 - 29 - textOffset * 5.5) + 30 || x > Math.floor(7 * this.width / 8 - 29 - textOffset * 5.5) + 48) return;
            const yRelative = Math.floor(y - this.height / 8 - 56);
            const yLeft = yRelative % 22;
            if (yLeft > 18) return;
            const row = Math.floor(yRelative / 22);
            if (row > this.itemsAvailable.length - 1) return;
            const item = this.itemsAvailable[row];
            if (item != null) game.colony.inventory.items[item].min += this.increaseSteps[this.increaseIndex][0];
        }, (game) => game.currentScreens.includes("inventory"));
        this.minMinusClickable = new ClickHandler(0, Math.floor(this.height / 8 + 56), this.width, 22 + 22 * maxRows, (game, x, y) => {
            if (x < Math.floor(7 * this.width / 8 - 29 - textOffset * 5.5) - 50 || x > Math.floor(7 * this.width / 8 - 29 - textOffset * 5.5) - 32) return;
            const yRelative = Math.floor(y - this.height / 8 - 56);
            const yLeft = yRelative % 22;
            if (yLeft > 18) return;
            const row = Math.floor(yRelative / 22);
            if (row > this.itemsAvailable.length - 1) return;
            const item = this.itemsAvailable[row];
            if (item != null) game.colony.inventory.items[item].min = Math.max(game.colony.inventory.items[item].min - this.increaseSteps[this.increaseIndex][0], 0);
        }, (game) => game.currentScreens.includes("inventory"));

        game.mouse.registerClickable(this.plusButton);
        game.mouse.registerClickable(this.minusButton);
        game.mouse.registerClickable(this.maxPlusClickable);
        game.mouse.registerClickable(this.maxMinusClickable);
        game.mouse.registerClickable(this.minPlusClickable);
        game.mouse.registerClickable(this.minMinusClickable);

        this.scrollBar = new ScrollBar(game, Math.floor(7 * this.width / 8 - 24), Math.floor(this.height / 8 + 56), 16, Math.floor(3 * this.height / 4 - 104), "v", 0, 5, 5, 24, (game) => game.currentScreens.includes("inventory"));
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        const inventory = game.colony.inventory;
        const preciseInventory = true;
        const textOffset = game.draw.textWidth("2.22m", 14);

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
        //Decay rate
        const decay = Math.max((inventory.storageUsed / inventory.storageCapacity) ** 2, 1);
        game.draw.text(`Decay Rate: ${game.draw.toShortNumber(decay * 100)}%`, Math.floor(7 * this.width / 8 - 8 - game.draw.textWidth(`Decay Rate: ${game.draw.toShortNumber(decay * 100)}%`)), Math.floor(7 * this.height / 8 - 38), 14, "white");

        //Draw key
        game.draw.textSmall(`Item`, Math.floor(this.width / 8 + 34), Math.floor(this.height / 8 + 46), 7, "white");
        game.draw.textSmallCenter(`Min`, Math.floor(7 * this.width / 8 - 29 - textOffset * 5.5), Math.floor(this.height / 8 + 46), 7, "white");
        game.draw.textSmallCenter(`Max`, Math.floor(7 * this.width / 8 - 29 - textOffset * 3), Math.floor(this.height / 8 + 46), 7, "white");
        game.draw.textSmallCenter(`Amt`, Math.floor(7 * this.width / 8 - 29 - textOffset / 2), Math.floor(this.height / 8 + 46), 7, "white");

        game.draw.textSmallCenter("Modify By:", Math.floor(7 * this.width / 8 - 28 - textOffset * 4.25), Math.floor(this.height / 8 + 13), 7, "#FFFFFF");
        game.draw.textCenter(this.increaseSteps[this.increaseIndex][1], Math.floor(7 * this.width / 8 - 28 - textOffset * 4.25), Math.floor(this.height / 8 + 25), 14, "#FFFFFF");
        ctx.beginPath();
        ctx.roundRect(Math.floor(7 * this.width / 8 - 28 - textOffset * 4.25) - 62, Math.floor(this.height / 8 + 15), 21, 21, 3);
        ctx.roundRect(Math.floor(7 * this.width / 8 - 28 - textOffset * 4.25) + 38, Math.floor(this.height / 8 + 15), 21, 21, 3);
        ctx.stroke();
        game.draw.textCenter("+", Math.floor(7 * this.width / 8 - 28 - textOffset * 4.25) + 50, Math.floor(this.height / 8 + 15), 21, "#FFFFFF");
        game.draw.textCenter("-", Math.floor(7 * this.width / 8 - 28 - textOffset * 4.25) - 50, Math.floor(this.height / 8 + 15), 21, "#FFFFFF");

        //Render the inventory itself
        /*
        each row of the inventory should be 16px tall with 4px padding between rows
        a section header should be centered and take up a whole row
        there should be two columns of items, each item entry is 1 row tall
        there will be a scroll bar on the right side of the inventory
        the scroll bar will scroll in increments of 1 row
        */

        this.rowScroll = Math.max(this.scrollBar.value, 0);
        this.itemsAvailable = [];

        const maxRows = Math.floor((3 * this.height / 4 - 104) / 22);
        let currentRow = 0;
        //find item with the most amount of items
        let maxItems = 0;
        for (let i = 0; i < Object.keys(inventory.items).length; i++) {
            if (inventory.items[Object.keys(inventory.items)[i]].amount > maxItems) maxItems = inventory.items[Object.keys(inventory.items)[i]].amount;
        }

        //loop through all inventory categories
        for (let i = 0; i < Object.keys(inventory.categories).length; i++) {
            //check if any items in the category have an amount greater than 0
            let hasItems = false;
            for (let j = 0; j < inventory.categories[Object.keys(inventory.categories)[i]].items.length; j++) {
                if (inventory.categories[Object.keys(inventory.categories)[i]].items[j].discovered) {
                    hasItems = true;
                    break;
                }
            }
            //if the category has no items, skip it
            if (!hasItems) continue;

            if (currentRow >= this.rowScroll && currentRow < this.rowScroll + maxRows) {
                game.draw.textCenter(`${inventory.categories[Object.keys(inventory.categories)[i]].name}`, Math.floor(this.width / 2), Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll)), 14, "white");
                ctx.fillStyle = '#555555';
                ctx.fillRect(Math.floor(this.width / 2 + 4 + game.draw.textWidth(inventory.categories[Object.keys(inventory.categories)[i]].name, 14) / 2), Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll) + 7), Math.floor(3 * this.width / 8 - 32 - game.draw.textWidth(inventory.categories[Object.keys(inventory.categories)[i]].name, 14) / 2), 2);
                ctx.fillRect(Math.floor(this.width / 8 + 8), Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll) + 7), Math.floor(3 * this.width / 8 - 12 - game.draw.textWidth(inventory.categories[Object.keys(inventory.categories)[i]].name, 14) / 2), 2);
                this.itemsAvailable.push(null);
            }
            //add 1 rows for the category header
            currentRow++;
            //loop through all items in the category
            for (let j = 0; j < inventory.categories[Object.keys(inventory.categories)[i]].items.length; j++) {
                //check if amount is greater than 0
                if (!(inventory.categories[Object.keys(inventory.categories)[i]].items[j].discovered)) {
                    continue;
                }

                if (currentRow >= this.rowScroll && currentRow < this.rowScroll + maxRows) {
                    //render the item
                    game.draw.sprite(ctx, inventory.categories[Object.keys(inventory.categories)[i]].items[j].key + "Small", Math.floor(this.width / 8 + 8), Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll)), 16, 16);

                    let item = inventory.categories[Object.keys(inventory.categories)[i]].items[j];
                    game.draw.text(`${inventory.categories[Object.keys(inventory.categories)[i]].items[j].name}`, Math.floor(this.width / 8 + 30), Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll) + 1), 14, "white");

                    const amountWidth = game.draw.textWidth(`${game.draw.toShortNumber(item.amount) + (item.amount < 1000 ? "k": "")}`, 14);
                    game.draw.text(`${game.draw.toShortNumber(item.amount)}`, Math.floor(7 * this.width / 8 - 29 - amountWidth), Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll) + 1), 14, "white");
                    game.draw.textCenter(`${game.draw.toShortNumber(item.min)}`, Math.floor(7 * this.width / 8 - 29 - textOffset * 5.5), Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll) + 1), 14, "white");
                    game.draw.textCenter(`${item.max == 0 ? "-" : game.draw.toShortNumber(item.max)}`, Math.floor(7 * this.width / 8 - 29 - textOffset * 3), Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll) + 1), 14, "white");
                    if (game.mouse.y > Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll)) && game.mouse.y < Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll)) + 22) {
                        game.draw.textCenter("+", Math.floor(7 * this.width / 8 - 29 - textOffset * 5.5) + 40, Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll) + 1), 14, "#FFFFFF");
                        game.draw.textCenter("-", Math.floor(7 * this.width / 8 - 29 - textOffset * 5.5) - 40, Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll) + 1), 14, "#FFFFFF");
                        game.draw.textCenter("+", Math.floor(7 * this.width / 8 - 29 - textOffset * 3) + 40, Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll) + 1), 14, "#FFFFFF");
                        game.draw.textCenter("-", Math.floor(7 * this.width / 8 - 29 - textOffset * 3) - 40, Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll) + 1), 14, "#FFFFFF");

                        ctx.beginPath();
                        ctx.roundRect(Math.floor(7 * this.width / 8 - 29 - textOffset * 5.5) - 50, Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll)), 18, 18, 3);
                        ctx.roundRect(Math.floor(7 * this.width / 8 - 29 - textOffset * 5.5) + 30, Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll)), 18, 18, 3);
                        ctx.roundRect(Math.floor(7 * this.width / 8 - 29 - textOffset * 3) - 50, Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll)), 18, 18, 3);
                        ctx.roundRect(Math.floor(7 * this.width / 8 - 29 - textOffset * 3) + 30, Math.floor(this.height / 8 + 56 + 22 * (currentRow - this.rowScroll)), 18, 18, 3);
                        ctx.stroke();
                    }

                    this.itemsAvailable.push(item.key);
                }
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