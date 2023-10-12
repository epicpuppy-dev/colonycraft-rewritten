import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";

export class PanelTraits extends Screen {
    private traitsButton: Button;

    constructor (game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.traitsButton = new Button(0, 130, Math.floor(width / 3 + 50), 164, (game: ColonyCraft) => {
            game.currentScreens.push("traits", "overlay");
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("game") && !game.currentScreens.includes("overlay");
        });

        game.mouse.registerClickable(this.traitsButton);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.roundRect(-50, 130, Math.floor(this.width / 3 + 50), 164, 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();

        const traits = game.colony.traits;

        //traits
        if (traits.active.s) {
            game.draw.textCenter(traits.active.s.name, Math.floor(this.width / 6), 138, 14, "white");
            ctx.fillStyle = "#8A2BE2";
            ctx.fillRect(10, 156, Math.floor((this.width / 3 - 20) * traits.active.s.progress), 10);
            ctx.strokeRect(10, 156, Math.floor(this.width / 3 - 20), 10);
        } else {
            game.draw.textCenter("No Social Trait Developing", Math.floor(this.width / 6), 143, 14, "white");
        }

        if (traits.active.c) {
            game.draw.textCenter(traits.active.c.name, Math.floor(this.width / 6), 178, 14, "white");
            ctx.fillStyle = "#ADFF2F";
            ctx.fillRect(10, 196, Math.floor((this.width / 3 - 20) * traits.active.c.progress), 10);
            ctx.strokeRect(10, 196, Math.floor(this.width / 3 - 20), 10);
        } else {
            game.draw.textCenter("No Cultural Trait Developing", Math.floor(this.width / 6), 183, 14, "white");
        }

        if (traits.active.p) {
            game.draw.textCenter(traits.active.p.name, Math.floor(this.width / 6), 218, 14, "white");
            ctx.fillStyle = "#FF7F50";
            ctx.fillRect(10, 236, Math.floor((this.width / 3 - 20) * traits.active.p.progress), 10);
            ctx.strokeRect(10, 236, Math.floor(this.width / 3 - 20), 10);
        } else {
            game.draw.textCenter("No Political Trait Developing", Math.floor(this.width / 6), 223, 14, "white");
        }

        if (traits.active.r) {
            game.draw.textCenter(traits.active.r.name, Math.floor(this.width / 6), 258, 14, "white");
            ctx.fillStyle = "#DAA520";
            ctx.fillRect(10, 276, Math.floor((this.width / 3 - 20) * traits.active.r.progress), 10);
            ctx.strokeRect(10, 276, Math.floor(this.width / 3 - 20), 10);
        } else {
            game.draw.textCenter("No Religious Trait Developing", Math.floor(this.width / 6), 263, 14, "white");
        }

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("game");
    }

    public resize(width: number, height: number) {
        this.traitsButton.reposition(0, 130, Math.floor(width / 3 + 50), 164);
    }

}