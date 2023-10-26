import { ColonyCraft } from "../../ColonyCraft";
import { Saveable } from "../../saving/Saveable";

export class Statistic /*implements Saveable*/ {
    //Amount of data points to store in memory
    public static readonly CACHESIZE = 160;
    //TODO: Amount of data points to save to file
    public static readonly SAVESIZE = 20;

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

        //game.save.register(this, "stat." + this.id);
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
    /*
    public save (): string {
        let string = "";
        for (const collect in this.data) {
            if (string.length > 0) string += "-";
            string += `${collect}:${this.data[collect].data[0] != Math.floor(this.data[collect].data[0]) ? 'd': ''}:`;
            if (this.data[collect].data[0] != Math.floor(this.data[collect].data[0])) string += this.data[collect].data.slice(0, Statistic.SAVESIZE).map((e) => e.toFixed(3)).reduce((a, b) => a + "," + b);
            else string += this.data[collect].data.slice(0, Statistic.SAVESIZE).map((e) => e.toString(36)).reduce((a, b) => a + "," + b);
        }
        return string;
    }

    public load (data: string) {
        for (const collect in this.data) {
            this.data[collect].data = [];
        }
        let split = data.split("-");
        for (const collect of split) {
            let split2 = collect.split(":");
            if (!this.data[split2[0]]) continue;
            if (split2[1] == "d") this.data[split2[0]].data = split2[2].split(",").map((e) => parseFloat(e));
            else this.data[split2[0]].data = split2[2].split(",").map((e) => parseInt(e, 36));
        }
    }
    */
}