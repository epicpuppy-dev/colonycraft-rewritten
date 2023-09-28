import { game } from "../../..";
import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class ScreenTitle extends Screen {
    private startButton: Button;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.startButton = new Button(Math.floor(this.width / 2 - 36), Math.floor(this.height / 2 + 24), 72, 72, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("title"), 1);
            game.currentScreens.push("game");
            game.simulation.toggleRunning(true);
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("title");
        });

        game.mouse.registerClickable(this.startButton);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        game.draw.textCenter("ColonyCraft", Math.floor(this.width / 2), Math.floor(this.height / 2 - 100), 56, "white");
        game.draw.sprite(ctx, "play", Math.floor(this.width / 2 - 36), Math.floor(this.height / 2 + 24), 72, 72);
        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("title");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.startButton.reposition(Math.floor(this.width / 2 - 36), Math.floor(this.height / 2 + 24), 72, 72);
    }
}