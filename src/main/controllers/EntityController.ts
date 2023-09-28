import { ColonyCraft } from "../ColonyCraft";
import { TickingEntity } from "../features/TickingEntity";

export class EntityController {
    private entities: TickingEntity[];

    constructor () {
        this.entities = [];
    }

    public tick (game: ColonyCraft) {
        this.entities.forEach(entity => {
            entity.tick(game);
        });
    }

    public registerEntity (entity: TickingEntity) {
        this.entities.push(entity);
        this.entities.sort((a, b) => {
            return a.priority - b.priority;
        });
    }
}