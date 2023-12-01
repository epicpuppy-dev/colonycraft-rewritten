import { ColonyCraft } from "../../ColonyCraft";
import { Screen } from "../Screen";

export class TopTooltip extends Screen {
    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        game.draw.tooltip.render(game, ctx);
        game.draw.renderText(ctx);
    }
    public active(game: ColonyCraft): boolean {
        return true;
    }

}