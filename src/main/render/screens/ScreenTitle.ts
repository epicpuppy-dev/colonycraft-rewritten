import { ColonyCraft } from "../../ColonyCraft";
import { ScreenController } from "../../controllers/ScreenController";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class ScreenTitle extends Screen {
    private startButton: Button;

    constructor(width: number, height: number) {
        super(width, height, 0, 0);
        this.startButton = new Button(Math.floor(this.width / 2 - 24), Math.floor(this.height / 2 + 25), 48, 48, (game: typeof ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("title"), 1);
            game.currentScreens.push("game");
        }, (game: typeof ColonyCraft) => {
            return game.currentScreens.includes("title");
        });

        ColonyCraft.mouse.registerButton(this.startButton);
    }

    public render(game: typeof ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        game.draw.textCenter(ctx, "ColonyCraft", Math.floor(this.width / 2), Math.floor(this.height / 2 - 100), 42, "white");
        game.draw.sprite(ctx, "play", Math.floor(this.width / 2 - 24), Math.floor(this.height / 2 + 25), 48, 48);
    }

    public active(game: typeof ColonyCraft, renderer: ScreenController): boolean {
        return game.currentScreens.includes("title");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.startButton.reposition(Math.floor(this.width / 2 - 24), Math.floor(this.height / 2 + 25), 48, 48);
    }
}