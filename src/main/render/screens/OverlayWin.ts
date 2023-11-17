import { ColonyCraft } from "../../ColonyCraft";
import { Button } from "../ui/Button";
import { Screen } from "../Screen";
import { WinUpdate } from "./WinUpdate";
import { version } from "../../../version";

export class OverlayWin extends Screen {
    private continueButton: Button;
    private winUpdate: WinUpdate;
    private fade: number = 0;

    constructor (game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);

        this.continueButton = new Button(Math.floor(this.width / 2 - 150), Math.floor(this.height / 2 + 190), 300, 36, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("win"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            game.simulation.toggleRunning(game, true);
        }, (game: ColonyCraft) => game.currentScreens.includes("win"));

        game.mouse.registerClickable(this.continueButton);

        this.winUpdate = new WinUpdate(game);
    }

    public render (game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        this.fade = Math.min(this.fade + game.clock.getFrameTime(game) / 5000 * 255, 255);
        const fadeHex = Math.floor(this.fade).toString(16).padStart(2, "0");

        ctx.fillStyle = "#000000" + fadeHex;
        ctx.fillRect(0, 0, this.width, this.height);

        game.draw.textCenter("Your colony thrives on as the monument is completed.", Math.floor(this.width / 2), Math.floor(this.height / 2) - 150, 14, "#ffffff");
        game.draw.textCenter("Many future generations are to come.", Math.floor(this.width / 2), Math.floor(this.height / 2) - 130, 14, "#ffffff");
        game.draw.textCenter("Congratulations! You have completed ColonyCraft v" + version.split("-")[0] + "!", Math.floor(this.width / 2), Math.floor(this.height / 2) - 50, 14, "#ffffff");
        game.draw.textCenter(`Your colony grew to a population of ${game.draw.toShortNumber(game.colony.population.adults + game.colony.population.seniors + game.colony.population.babies + game.colony.population.children)} people.`, Math.floor(this.width / 2), Math.floor(this.height / 2) + 30, 14, "#ffffff");
        game.draw.textCenter(`${game.clock.year - 1} years have passed since your colony was founded.`, Math.floor(this.width / 2), Math.floor(this.height / 2) + 50, 14, "#ffffff");
        game.draw.textCenter("Thank you for playing.", Math.floor(this.width / 2), Math.floor(this.height / 2) + 110, 14, "#ffffff");
        game.draw.textCenter("Continue thriving", Math.floor(this.width / 2), Math.floor(this.height / 2) + 200, 14, "#ffffff");
        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 2) - 150, Math.floor(this.height / 2) + 190, 300, 36, 4);
        ctx.strokeStyle = "#777777" + fadeHex;
        ctx.lineWidth = 2;
        ctx.stroke();

        game.draw.renderText(ctx, this.fade / 255);
    }

    public active (game: ColonyCraft): boolean {
        if (!game.currentScreens.includes("win")) this.fade = 0;
        return game.currentScreens.includes("win");
    }
}