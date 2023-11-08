import { version } from "../../../version";
import { ColonyCraft } from "../../ColonyCraft";
import { KeyAction } from "../../player/KeyAction";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class OverlayPause extends Screen {
    private resumeButton: Button;
    private saveButton: Button;
    private loadButton: Button;
    private exitButton: Button;

    constructor (game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        game.key.addAction(new KeyAction("pauseMenu", "Pause Menu", (game, prevScreens) => {
            if (prevScreens.includes("game") && !prevScreens.includes("overlay")) {
                game.currentScreens.push("pause", "overlay");
                game.simulation.toggleRunning(game, false);
            }
            else if (prevScreens.includes("pause") && !prevScreens.includes("overlay2")) {
                game.currentScreens.splice(game.currentScreens.indexOf("pause"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
                game.simulation.toggleRunning(game, true);
            }
        }));
        
        game.draw.addCloseAction(game.key.actions.pauseMenu);

        this.resumeButton = new Button(Math.floor(this.width / 2 - 130), Math.floor(this.height / 2 - 88), 260, 32, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("pause"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            game.simulation.toggleRunning(game, true);
        }, (game: ColonyCraft) => game.currentScreens.includes("pause") && !game.currentScreens.includes("overlay2"));

        this.saveButton = new Button(Math.floor(this.width / 2 - 130), Math.floor(this.height / 2 - 40), 260, 32, (game: ColonyCraft) => {
            game.currentScreens.push("save", "overlay2");
            game.save.toSave = game.save.save();
        }, (game: ColonyCraft) => game.currentScreens.includes("pause") && !game.currentScreens.includes("overlay2"));

        this.loadButton = new Button(Math.floor(this.width / 2 - 130), Math.floor(this.height / 2 + 8), 260, 32, (game: ColonyCraft) => {
            game.currentScreens.push("load", "overlay2");
        }, (game: ColonyCraft) => game.currentScreens.includes("pause") && !game.currentScreens.includes("overlay2"));

        this.exitButton = new Button(Math.floor(this.width / 2 - 130), Math.floor(this.height / 2 + 56), 260, 32, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("pause"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("game"), 1);
            game.currentScreens.push("title");
            game.simulation.toggleRunning(game, false);
        }, (game: ColonyCraft) => game.currentScreens.includes("pause") && !game.currentScreens.includes("overlay2"));

        game.mouse.registerClickable(this.resumeButton);
        game.mouse.registerClickable(this.saveButton);
        game.mouse.registerClickable(this.loadButton);
        game.mouse.registerClickable(this.exitButton);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.fillStyle = '#00000077';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 2 - 150), Math.floor(this.height / 2 - 110), 300, 220, 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 2 - 130), Math.floor(this.height / 2 - 88), 260, 32, 5);
        ctx.roundRect(Math.floor(this.width / 2 - 130), Math.floor(this.height / 2 - 40), 260, 32, 5);
        ctx.roundRect(Math.floor(this.width / 2 - 130), Math.floor(this.height / 2 + 8), 260, 32, 5);
        ctx.roundRect(Math.floor(this.width / 2 - 130), Math.floor(this.height / 2 + 56), 260, 32, 5);
        ctx.stroke();
        game.draw.textCenter("Back to Game", Math.floor(this.width / 2), Math.floor(this.height / 2 - 80), 14, "white");
        game.draw.textCenter("Save Game", Math.floor(this.width / 2), Math.floor(this.height / 2 - 32), 14, "white");
        game.draw.textCenter("Load Game", Math.floor(this.width / 2), Math.floor(this.height / 2 + 16), 14, "white");
        game.draw.textCenter("Exit to Main Menu", Math.floor(this.width / 2), Math.floor(this.height / 2 + 64), 14, "white");

        game.draw.text("v" + version, 10, this.height - 20, 14, "white");

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("pause");
    }
}