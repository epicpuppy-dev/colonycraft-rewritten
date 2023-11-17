import { version } from "../../../version";
import { ColonyCraft } from "../../ColonyCraft";
import { TickingEntity } from "../../content/TickingEntity";
import { Saveable } from "../../saving/Saveable";

export class WinUpdate extends TickingEntity implements Saveable {
    public won: boolean = false;

    constructor (game: ColonyCraft) {
        super(game);
        game.save.register(this, "win");
    }

    public tick (game: ColonyCraft): void {
        if (game.colony.buildings.buildings.monument1.amount > 0 && !this.won) {
            game.currentScreens = ["game", "win", "overlay"];
            game.simulation.toggleRunning(game, false);
            this.won = true;
        }
    }

    public save (): string {
        return this.won ? version : "";
    }

    public load (data: string): void {
        if (data == version) {
            this.won = true;
        } else {
            this.won = false;
        }
    }
    public newGame (): void {
        this.won = false;
    }
}