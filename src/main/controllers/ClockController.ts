import { ColonyCraft } from "../ColonyCraft";
import { Saveable } from "../saving/Saveable";

export class ClockController implements Saveable {
    public year: number = 1;
    public season: number = 1;
    public day: number = 1;
    public dayTotal: number = 0;
    /*
    year = 4 seasons
    season = 30 days
    1 = spring
    2 = summer
    3 = fall
    4 = winter
    */
    private static FRAME_CACHE_SIZE: number = 30;
    private static TICK_CACHE_SIZE: number = 10;
    private frameTime: number[];
    private tickTime: number[];
    private frameStart: number;
    private tickStart: number;
    public fps: number;
    public tps: number;
    private nextTick: number = 0;
    private running: boolean;

    constructor (game: ColonyCraft, fps: number, tps: number) {
        this.fps = fps;
        this.tps = tps;
        this.frameStart = performance.now();
        this.tickStart = performance.now();
        this.frameTime = [1000 / fps];
        this.tickTime = [1000 / tps];
        this.running = false;

        game.save.register(this, "clock");
    }

    public startTick(game: ColonyCraft) {
        game.tick();
        const timePassed = performance.now() - this.tickStart;
        this.tickTime.push(Math.max(timePassed, 1000 / this.tps));
        if (this.tickTime.length > ClockController.TICK_CACHE_SIZE) this.tickTime.shift();
        if (this.running) this.nextTick = window.setTimeout(() => this.startTick(game), 1000 / this.tps - Math.max(0, timePassed - 1000 / this.tps));
        this.tickStart = performance.now();
    }

    public startFrame(game: ColonyCraft) {
        game.render();
        const timePassed = performance.now() - this.frameStart;
        this.frameTime.push(Math.max(timePassed, 1000 / this.fps));
        if (this.frameTime.length > ClockController.FRAME_CACHE_SIZE) this.frameTime.shift();
        requestAnimationFrame(() => this.startFrame(game));
        this.frameStart = performance.now();
    }

    public stopTick () {
        clearTimeout(this.nextTick);
        this.nextTick = 0;
        this.running = false;
    }

    public startTicking(game: ColonyCraft) {
        this.nextTick = window.setTimeout(() => this.startTick(game), 1000 / this.tps);
        this.tickStart = performance.now();
        this.running = true;
    }

    public resetFrameTime () {
        this.frameTime = [1000 / this.fps];
        this.frameStart = performance.now();
    }

    public resetTickTime () {
        this.tickTime = [1000 / this.tps];
        this.tickStart = performance.now();
    }

    public getFPS (game: ColonyCraft): number {
        return 1000 / (this.frameTime.reduce((a, b) => a + b) / this.frameTime.length);
    }

    public getFrameTime (game: ColonyCraft): number {
        return this.frameTime.reduce((a, b) => a + b) / this.frameTime.length;
    }

    public getTPS (game: ColonyCraft): number {
        return 1000 / (this.tickTime.reduce((a, b) => a + b) / this.tickTime.length);
    }

    public getTickTime (game: ColonyCraft): number {
        return this.tickTime.reduce((a, b) => a + b) / this.tickTime.length;
    }

    public changeTPS (tps: number) {
        this.tps = tps;
        this.tickTime = [1000 / tps];
    }

    public changeFPS (fps: number) {
        this.fps = fps;
        this.frameTime = [1000 / fps];
    }

    public save (): string {
        return `${this.year.toString(36)}-${this.season.toString(36)}-${this.day.toString(36)}-${this.dayTotal.toString(36)}`;
    }

    public load (data: string) {
        let split = data.split("-");
        if (!isNaN(parseInt(split[0], 36))) this.year = parseInt(split[0], 36);
        if (!isNaN(parseInt(split[1], 36))) this.season = parseInt(split[1], 36);
        if (!isNaN(parseInt(split[2], 36))) this.day = parseInt(split[2], 36);
        if (!isNaN(parseInt(split[3], 36))) this.dayTotal = parseInt(split[3], 36);
    }

    public newGame() {
        this.year = 1;
        this.season = 1;
        this.day = 1;
        this.dayTotal = 0;
    }
}