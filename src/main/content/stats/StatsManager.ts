import { ColonyCraft } from "../../ColonyCraft";
import { Statistic } from "./Statistic";
import { StatsUpdate } from "./StatsUpdate";

export class StatsManager {
    public stats: {[key: string]: Statistic} = {};
    private update: StatsUpdate;

    constructor (game: ColonyCraft) {
        this.update = new StatsUpdate(game, 100);
    }

    public addStatistic(stat: Statistic) {
        this.stats[stat.id] = stat;
    }
}