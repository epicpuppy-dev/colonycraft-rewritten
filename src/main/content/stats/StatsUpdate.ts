import { ColonyCraft } from "../../ColonyCraft";
import { TickingEntity } from "../TickingEntity";

export class StatsUpdate extends TickingEntity {
    public tick(game: ColonyCraft): void {
        const stats = game.stats;
        for (const stat of Object.values(stats.stats)) {
            stat.tick(game);
        }
    }
}