import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ClickHandler } from "../ui/ClickHandler";
import { ScrollBar } from "../ui/ScrollBar";

export class Overlay2Load extends Screen {
    private textInput = "";
    private deleteButton: Button;
    private exportButton: Button;
    private cancelButton: Button;
    private loadButton: Button;
    private selectClickable: ClickHandler;
    private rowScroll = 0;
    private scrollBar: ScrollBar;
    private available: string[] = [];
    private deleteConfirm = false;
    private fileDialogOpen = false;

    constructor (game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);

        this.selectClickable = new ClickHandler(Math.floor(this.width / 4 + 20), Math.floor(this.height / 8 + 42), Math.floor(this.width / 2 - 64), Math.floor(3 * this.height / 4 - 134), (game, x, y) => {  
            const row = Math.floor((y - this.height / 8 - 42) / 38);
            this.deleteConfirm = false;
            if (row > this.available.length - 1 || row < 0) return;
            this.textInput = this.available[row];
        }, game => game.currentScreens.includes("load"));

        game.mouse.registerClickable(this.selectClickable);

        this.deleteButton = new Button(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 80), Math.floor(this.width / 4 - 15), 30, (game: ColonyCraft) => {
            if (this.fileDialogOpen) return;
            if (this.textInput.length == 0) return;
            const save = game.save.saves.find(item => item.id == this.textInput.toLowerCase().replace(" ", ""));
            if (save) {
                if (!this.deleteConfirm) {
                    this.deleteConfirm = true;
                    return;
                }
                window.localStorage.removeItem(save.id);
                game.save.storage -= save.size;
                game.save.saves.splice(game.save.saves.indexOf(save), 1);
                window.localStorage.setItem("_CCMeta", JSON.stringify({saves: game.save.saves, storage: game.save.storage}));
                this.deleteConfirm = false;
            }
            this.textInput = "";
            this.available = [];
        }, (game: ColonyCraft) => game.currentScreens.includes("load"));

        this.exportButton = new Button(Math.floor(this.width / 2 + 5), Math.floor(7 * this.height / 8 - 80), Math.floor(this.width / 4 - 15), 30, (game: ColonyCraft) => {
            if (this.fileDialogOpen) return;
            if (this.textInput.length == 0) return;
            const save = game.save.saves.find(item => item.id == this.textInput.toLowerCase().replace(" ", ""));
            if (save) {
                const data = window.localStorage.getItem(save.id);
                if (data) {
                    const blob = new Blob([data], {type: "application/ccsave"});
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.download = `${save.id}.ccsave`;
                    link.href = url;
                    link.click();
                }
            }
        }, (game: ColonyCraft) => game.currentScreens.includes("load"));

        this.cancelButton = new Button(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 40), Math.floor(this.width / 4 - 15), 30, (game: ColonyCraft) => {
            if (this.fileDialogOpen) return;
            this.textInput = "";
            this.available = [];
            game.currentScreens.splice(game.currentScreens.indexOf("load"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay2"), 1);
        }, (game: ColonyCraft) => game.currentScreens.includes("load"));

        this.loadButton = new Button(Math.floor(this.width / 2 + 5), Math.floor(7 * this.height / 8 - 40), Math.floor(this.width / 4 - 15), 30, (game: ColonyCraft) => {
            if (this.fileDialogOpen) return;
            const save = game.save.saves.find(item => item.id == this.textInput.toLowerCase().replace(" ", ""));
            if (save) {
                const data = window.localStorage.getItem(save.id);
                if (data) game.save.load(data);
            } else {
                //https://stackoverflow.com/questions/16215771/how-to-open-select-file-dialog-via-js
                var input = document.createElement('input');
                input.type = 'file';
                input.accept = ".ccsave";

                input.onchange = e => { 
                    if (input.files) {
                        let file = input.files[0];

                        let reader = new FileReader();
                        reader.readAsText(file, "UTF-8");

                        reader.onload = readerEvent => {
                            this.fileDialogOpen = false;
                            let content = readerEvent.target?.result;
                            if (typeof content == "string") game.save.load(content);
                            game.currentScreens.splice(game.currentScreens.indexOf("load"), 1);
                            game.currentScreens.splice(game.currentScreens.indexOf("overlay2"), 1);
                            if (game.currentScreens.includes("title")) {
                                game.currentScreens.splice(game.currentScreens.indexOf("title"), 1);
                                game.currentScreens.push("game");
                                game.simulation.toggleRunning(game, true);
                            }
                            this.textInput = "";
                            this.available = [];
                            game.colony.inventory.storageUpdate.tick(game);
                            game.colony.inventory.preUpdate.tick(game);
                        }
                    }
                }

                input.click();
                this.fileDialogOpen = true;
                return;
            }
            game.currentScreens.splice(game.currentScreens.indexOf("load"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay2"), 1);
            if (game.currentScreens.includes("title")) {
                game.currentScreens.splice(game.currentScreens.indexOf("title"), 1);
                game.currentScreens.push("game");
                game.simulation.toggleRunning(game, true);
            }
            this.textInput = "";
            this.available = [];
            game.colony.inventory.storageUpdate.tick(game);
            game.colony.inventory.preUpdate.tick(game);
        }, (game: ColonyCraft) => game.currentScreens.includes("load"));

        game.mouse.registerClickable(this.deleteButton);
        game.mouse.registerClickable(this.exportButton);
        game.mouse.registerClickable(this.cancelButton);
        game.mouse.registerClickable(this.loadButton);

        this.scrollBar = new ScrollBar(game, Math.floor(3 * this.width / 4 - 24), Math.floor(this.height / 8 + 50), 16, Math.floor(3 * this.height / 4 - 156), "v", 0, 5, 5, 48, game => game.currentScreens.includes("load"));
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.fillStyle = '#00000077';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 4), Math.floor(this.height / 8), Math.floor(this.width / 2), Math.floor(3 * this.height / 4), 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#555555';
        game.draw.textCenter("Load Game", Math.floor(this.width / 2), Math.floor(this.height / 8 + 8), 28, "white");
        ctx.fillRect(Math.floor(this.width / 4 + 20), Math.floor(this.height / 8 + 42), Math.floor(this.width / 2 - 40), 2);

        let areaWidth = this.width / 2 - 24;
        let maxRows = Math.floor((3 * this.height / 4 - 144) / 38);
        let currentRow = 0;
        this.available = [];
        this.rowScroll = Math.max(this.scrollBar.value, 0);

        for (const save of game.save.saves) {
            if (currentRow >= this.rowScroll && currentRow < this.rowScroll + maxRows) {
                if (save.id == this.textInput.toLowerCase().replace(/\s/g, '')) {
                    ctx.fillStyle = "#333333";
                    ctx.fillRect(Math.floor(this.width / 4 + 20), Math.floor(this.height / 8 + 44 + 38 * (currentRow - this.rowScroll)), Math.floor(this.width / 2 - 66), 38);
                    ctx.fillStyle = "#555555";
                }
                game.draw.textCenter(save.name, Math.floor(this.width / 4 + areaWidth / 2), Math.floor(this.height / 8 + 50 + 38 * (currentRow - this.rowScroll)), 14, "white");
                game.draw.textSmallCenter(`Year ${save.year} - ${save.timestamp} - ${save.version ? "v" + save.version : "Unknown Version"} - ${(save.size / 1024).toFixed(1)}KB`, Math.floor(this.width / 4 + areaWidth / 2), Math.floor(this.height / 8 + 70 + 38 * (currentRow - this.rowScroll)), 7, "white");
                ctx.fillRect(Math.floor(this.width / 4 + 20), Math.floor(this.height / 8 + 80 + 38 * (currentRow - this.rowScroll)), Math.floor(this.width / 2 - 64), 2);
                this.available.push(save.name);
            }
            currentRow++;
        }

        ctx.fillStyle = '#777777';
        const barWidth = (this.width / 2 - 20) * game.save.storage / (4096 * 1024);
        ctx.fillRect(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 100), barWidth, 12);
        ctx.fillStyle = '#444444';
        ctx.fillRect(Math.floor(this.width / 4 + 10 + barWidth), Math.floor(7 * this.height / 8 - 100), (this.width / 2 - 20) * game.save.toSave.length / 512 / 4096, 12);
        ctx.strokeRect(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 100), Math.floor(this.width / 2 - 20), 12);
        game.draw.textSmallCenter(`Storage Used: ${(game.save.storage / 1024).toFixed(1)}KB / 4MB`, Math.floor(this.width / 2), Math.floor(7 * this.height / 8 - 98), 7, "white");

        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 80), Math.floor(this.width / 4 - 15), 30, 4);
        ctx.roundRect(Math.floor(this.width / 2 + 5), Math.floor(7 * this.height / 8 - 80), Math.floor(this.width / 4 - 15), 30, 4);
        ctx.roundRect(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 40), Math.floor(this.width / 4 - 15), 30, 4);
        ctx.roundRect(Math.floor(this.width / 2 + 5), Math.floor(7 * this.height / 8 - 40), Math.floor(this.width / 4 - 15), 30, 4);
        ctx.stroke();
        let save = game.save.saves.find(item => item.id == this.textInput.toLowerCase().replace(/\s/g, ''));
        game.draw.textCenter(this.deleteConfirm ? "Confirm?" : "Delete", Math.floor(3 * this.width / 8 + 2.5), Math.floor(7 * this.height / 8 - 72), 14, save ? "red" : "#777777");
        game.draw.textCenter("Export", Math.floor(5 * this.width / 8 - 2.5), Math.floor(7 * this.height / 8 - 72), 14, save ? "white" : "#777777");
        game.draw.textCenter("Cancel", Math.floor(3 * this.width / 8 + 2.5), Math.floor(7 * this.height / 8 - 32), 14, "white");
        game.draw.textCenter(save ? "Load" : "Import", Math.floor(5 * this.width / 8 - 2.5), Math.floor(7 * this.height / 8 - 32), 14, "white");

        this.scrollBar.setBounds(this.rowScroll, maxRows, game.save.saves.length - maxRows);
        this.scrollBar.render(ctx);

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("load");
    }
}