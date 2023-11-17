import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";

export class ScreenLoading extends Screen {
    private goToMenu: boolean = false;
    private loaded: number = 0;
    private loading: number;
    
    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);

        this.loading = window.setInterval(() => this.loaded = Math.min(this.loaded + Math.random() * 50, 100), 200);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        game.draw.textCenter("an", Math.floor(this.width / 2), Math.floor(this.height / 2 - 150), 28, "white");
        game.draw.textCenter("epicpuppy.dev", Math.floor(this.width / 2), Math.floor(this.height / 2 - 100), 42, "white");
        game.draw.textCenter("production", Math.floor(this.width / 2), Math.floor(this.height / 2 - 24), 28, "white");

        let totalSheets = Object.keys(game.draw.sprites.sheets).length;
        let loaded = 0;
        for (const sheet in game.draw.sprites.sheets) {
            if (game.draw.sprites.getLoaded(sheet)) loaded++;
        }
        loaded *= this.loaded / 100;

        ctx.fillStyle = "#555555";
        ctx.fillRect(Math.floor(this.width / 4), Math.floor(this.height / 2 + 100), Math.floor(this.width / 2) * (loaded / totalSheets), 16);
        
        ctx.strokeStyle = "#777777";
        ctx.lineWidth = 2;
        ctx.strokeRect(Math.floor(this.width / 4), Math.floor(this.height / 2 + 100), Math.floor(this.width / 2), 16);

        if (loaded == totalSheets && !this.goToMenu) {
            window.setTimeout(() =>{
                game.currentScreens.splice(game.currentScreens.indexOf("loading"), 1);
                game.currentScreens.push("title");
            }, 100);
            this.goToMenu = true;
            window.clearInterval(this.loading);
        }

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("loading");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}