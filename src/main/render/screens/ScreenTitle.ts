import { version } from "../../../version";
import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class ScreenTitle extends Screen {
    private newGame: Button;
    private loadGame: Button;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);

        this.newGame = new Button(Math.floor(this.width / 2 - 200), Math.floor(this.height / 2 - 10), 400, 52, () => {
            game.save.newGame();
            game.colony.inventory.storageUpdate.tick(game);
            game.colony.inventory.preUpdate.tick(game);
            game.currentScreens.splice(game.currentScreens.indexOf("title"), 1);
            game.currentScreens.push("game");
            game.simulation.toggleRunning(game, true);
        }, () => game.currentScreens.includes("title") && !game.currentScreens.includes("overlay2"));

        this.loadGame = new Button(Math.floor(this.width / 2 - 200), Math.floor(this.height / 2 + 60), 400, 52, () => {
            game.currentScreens.push("load", "overlay2");
        }, () => game.currentScreens.includes("title") && !game.currentScreens.includes("overlay2"));

        game.mouse.registerClickable(this.newGame);
        game.mouse.registerClickable(this.loadGame);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        game.draw.textCenter("ColonyCraft", Math.floor(this.width / 2), Math.floor(this.height / 2 - 200), 56, "white");

        ctx.strokeStyle = "#777777";
        ctx.fillStyle = "#222222";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 2 - 200), Math.floor(this.height / 2 - 10), 400, 52, 8);
        ctx.roundRect(Math.floor(this.width / 2 - 200), Math.floor(this.height / 2 + 60), 400, 52, 8);
        ctx.roundRect(Math.floor(this.width / 2 - 200), Math.floor(this.height / 2 + 130), 400, 52, 8);
        ctx.fill();
        ctx.stroke();

        game.draw.textCenter("Start", Math.floor(this.width / 2), Math.floor(this.height / 2), 28, "white");
        game.draw.textCenter("Load Game", Math.floor(this.width / 2), Math.floor(this.height / 2 + 70), 28, "white");
        game.draw.textCenter("Settings", Math.floor(this.width / 2), Math.floor(this.height / 2 + 140), 28, "white");
        game.draw.text("v" + version, 10, this.height - 20, 14, "white");
        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("title");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}