import { ColonyCraft } from "../../ColonyCraft";
import { ScreenLayer } from "../ScreenLayer";

export class LayerGame extends ScreenLayer {
    constructor(game: ColonyCraft) {
        super(game, -5);
    }
}