import { game } from "../..";
import { ColonyCraft } from "../ColonyCraft";

export abstract class TickingEntity {
    public priority: number = 0;

    constructor (game: ColonyCraft, priority: number = 0) {
        this.priority = priority;
        game.entities.registerEntity(this);
    }

    public abstract tick(game: ColonyCraft): void;
}