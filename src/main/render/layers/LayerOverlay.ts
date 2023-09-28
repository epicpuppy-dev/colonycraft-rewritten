import { ColonyCraft } from "../../ColonyCraft";
import { ScreenLayer } from "../ScreenLayer";

export class LayerOverlay extends ScreenLayer {
    constructor(game: ColonyCraft) {
        super(game, 10);
    }
}