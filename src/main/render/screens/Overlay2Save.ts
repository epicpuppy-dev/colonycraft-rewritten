import { version } from "../../../version";
import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ClickHandler } from "../ui/ClickHandler";
import { ScrollBar } from "../ui/ScrollBar";

export class Overlay2Save extends Screen {
    private textInput = "";
    private blink = 0;
    private cancelButton: Button;
    private saveButton: Button;
    private selectClickable: ClickHandler;
    private rowScroll = 0;
    private scrollBar: ScrollBar;
    private available: string[] = [];

    constructor (game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);

        this.cancelButton = new Button(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 40), Math.floor(this.width / 4 - 15), 30, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("save"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay2"), 1);
        }, (game: ColonyCraft) => game.currentScreens.includes("save"));

        this.saveButton = new Button(Math.floor(this.width / 2 + 5), Math.floor(7 * this.height / 8 - 40), Math.floor(this.width / 4 - 15), 30, (game: ColonyCraft) => {
            if (this.textInput.length == 0) return;
            const overwrite = game.save.saves.find(item => item.id == this.textInput.toLowerCase().replace(" ", ""));
            if (overwrite) {
                game.save.storage -= overwrite.size;
                game.save.saves.splice(game.save.saves.indexOf(overwrite), 1);
            }
            let date = new Date();
            game.save.saves.push({name: this.textInput, id: this.textInput.toLowerCase().replace(" ", ""), size: game.save.toSave.length * 2, year: game.clock.year, timestamp: date.toLocaleTimeString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'}), version: version});
            window.localStorage.setItem(this.textInput.toLowerCase().replace(/\s/g, ''), game.save.toSave);
            game.save.storage += game.save.toSave.length * 2;
            window.localStorage.setItem("_CCMeta", JSON.stringify({autosave: game.save.autosave, saves: game.save.saves, storage: game.save.storage}));
            game.currentScreens.splice(game.currentScreens.indexOf("save"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay2"), 1);
        }, (game: ColonyCraft) => game.currentScreens.includes("save"));

        game.mouse.registerClickable(this.cancelButton);
        game.mouse.registerClickable(this.saveButton);

        this.scrollBar = new ScrollBar(game, Math.floor(3 * this.width / 4 - 24), Math.floor(this.height / 8 + 50), 16, Math.floor(3 * this.height / 4 - 150), "v", 0, 5, 5, 48, game => game.currentScreens.includes("save"));

        this.selectClickable = new ClickHandler(Math.floor(this.width / 4 + 20), Math.floor(this.height / 8 + 42), Math.floor(this.width / 2 - 64), Math.floor(3 * this.height / 4 - 134), (game, x, y) => {  
            const row = Math.floor((y - this.height / 8 - 42) / 38);
            if (row > this.available.length - 1 || row < 0) return;
            this.textInput = this.available[row];
        }, game => game.currentScreens.includes("save"));

        game.mouse.registerClickable(this.selectClickable);

        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (!game.currentScreens.includes("save")) return;
            if (e.key === "Backspace") {
                this.textInput = this.textInput.slice(0, -1);
            }
            else if (e.key.length == 1 && /[a-zA-Z0-9-_ ]/.test(e.key) && this.textInput.length < 32) {
                this.textInput += e.key;
            }
        });
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
        game.draw.textCenter("Save Game", Math.floor(this.width / 2), Math.floor(this.height / 8 + 8), 28, "white");
        ctx.fillRect(Math.floor(this.width / 4 + 20), Math.floor(this.height / 8 + 42), Math.floor(this.width / 2 - 40), 2);

        let areaWidth = this.width / 2 - 24;
        let maxRows = Math.floor((3 * this.height / 4 - 134) / 38);
        let currentRow = 0;
        this.available = [];
        this.rowScroll = Math.max(this.scrollBar.value, 0);

        for (const save of game.save.saves) {
            if (currentRow >= this.rowScroll && currentRow < this.rowScroll + maxRows) {
                if (save.id == this.textInput.toLowerCase().replace(/\s/g, '')) {
                    ctx.fillStyle = "#333333";
                    ctx.fillRect(Math.floor(this.width / 4 + 20), Math.floor(this.height / 8 + 44 + 38 * (currentRow - this.rowScroll)), Math.floor(this.width / 2 - 66), 38);
                    ctx.fillStyle = "#777777";
                }
                game.draw.textCenter(save.name, Math.floor(this.width / 4 + areaWidth / 2), Math.floor(this.height / 8 + 50 + 38 * (currentRow - this.rowScroll)), 14, "white");
                game.draw.textSmallCenter(`Year ${save.year} - ${save.timestamp} - ${save.version ? "v" + save.version : "Unknown Version"} - ${(save.size / 1024).toFixed(1)}KB`, Math.floor(this.width / 4 + areaWidth / 2), Math.floor(this.height / 8 + 70 + 38 * (currentRow - this.rowScroll)), 7, "white");
                ctx.fillRect(Math.floor(this.width / 4 + 20), Math.floor(this.height / 8 + 80 + 38 * (currentRow - this.rowScroll)), Math.floor(this.width / 2 - 64), 2);
                this.available.push(save.name);
            }
            currentRow++;
        }

        ctx.strokeRect(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 92), Math.floor(this.width / 2 - 20), 24);
        game.draw.text(this.textInput, Math.floor(this.width / 4 + 14), Math.floor(7 * this.height / 8 - 88), 14, "white");
        
        ctx.fillStyle = '#ffffff';
        this.blink += game.clock.getFrameTime(game);
        if (this.blink > 400) ctx.fillRect(Math.floor(this.width / 4 + 14 + game.draw.textWidth(this.textInput, 14)), Math.floor(7 * this.height / 8 - 89), 2, 18);
        if (this.blink > 800) this.blink = 0;

        ctx.fillStyle = '#777777';
        const barWidth = (this.width / 2 - 20) * game.save.storage / (4096 * 1024);
        ctx.fillRect(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 60), barWidth, 12);
        ctx.fillStyle = '#444444';
        ctx.fillRect(Math.floor(this.width / 4 + 10 + barWidth), Math.floor(7 * this.height / 8 - 60), (this.width / 2 - 20) * game.save.toSave.length / 512 / 4096, 12);
        ctx.strokeRect(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 60), Math.floor(this.width / 2 - 20), 12);
        game.draw.textSmallCenter(`Storage Used: ${(game.save.storage / 1024).toFixed(1)}KB (+${(game.save.toSave.length / 512).toFixed(1)}KB) / 4MB`, Math.floor(this.width / 2), Math.floor(7 * this.height / 8 - 58), 7, "white");

        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 4 + 10), Math.floor(7 * this.height / 8 - 40), Math.floor(this.width / 4 - 15), 30, 4);
        ctx.roundRect(Math.floor(this.width / 2 + 5), Math.floor(7 * this.height / 8 - 40), Math.floor(this.width / 4 - 15), 30, 4);
        ctx.stroke();
        game.draw.textCenter("Cancel", Math.floor(3 * this.width / 8 + 2.5), Math.floor(7 * this.height / 8 - 32), 14, "white");
        let save = game.save.saves.find(item => item.id == this.textInput.toLowerCase().replace(/\s/g, ''));
        let color = this.textInput.length == 0 ? "#777777" : save ? "#ffaa55" : "#ffffff";
        game.draw.textCenter(save ? "Overwrite" : "Save", Math.floor(5 * this.width / 8 - 2.5), Math.floor(7 * this.height / 8 - 32), 14, color);

        this.scrollBar.setBounds(this.rowScroll, maxRows, game.save.saves.length - maxRows);
        this.scrollBar.render(ctx);

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("save");
    }
}