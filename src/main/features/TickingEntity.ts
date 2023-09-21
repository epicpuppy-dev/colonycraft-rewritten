import { ColonyCraft } from "../ColonyCraft";

export abstract class TickingEntity {
    public priority: number = 0;

    constructor (priority: number = 0) {
        this.priority = priority;
        ColonyCraft.entities.registerEntity(this);
    }

    public abstract tick(game: typeof ColonyCraft): void;
}