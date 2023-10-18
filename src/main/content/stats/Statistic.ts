import { ColonyCraft } from "../../ColonyCraft";

export class Statistic {
    public static readonly CACHESIZE = 160;

    public id: string;
    public name: string;
    //every x days, collect data
    //30 days = quarter
    //120 days = year
    public data: {[key: string]: {data: number[], interval: number}};
    public monitor: (game: ColonyCraft) => number;

    constructor (game: ColonyCraft, id: string, name: string, data: {[key: string]: number}, monitor: (game: ColonyCraft) => number) {
        this.id = id;
        this.name = name;
        this.data = {};
        for (const key of Object.keys(data)) {
            this.data[key] = {data: [monitor(game)], interval: data[key]};
        }
        this.monitor = monitor;
    }

    public tick (game: ColonyCraft) {
        const data = this.monitor(game);
        for (const collect of Object.keys(this.data)) {
            if (game.clock.dayTotal % this.data[collect].interval !== 0) continue;
            this.data[collect].data.unshift(data);
            if (this.data[collect].data.length > Statistic.CACHESIZE) this.data[collect].data.pop();
        }
    }

    public max (interval: string, points: number) {
        let max = 0;
        for (const data of this.data[interval].data.slice(0, points)) {
            max = Math.max(max, data);
        }
        return max;
    }
}