import { game } from "../../index";
import { ColonyCraft } from "../ColonyCraft";

export class ClockController {
    public year: number;
    public season: number;
    public day: number;
    /*
    year = 4 seasons
    season = 30 days
    1 = spring
    2 = summer
    3 = fall
    4 = winter
    */
    private static FRAME_CACHE_SIZE: number = 60;
    private static TICK_CACHE_SIZE: number = 20;
    private frameTime: number[];
    private tickTime: number[];
    private frameStart: number;
    private tickStart: number;
    public fps: number;
    public tps: number;
    private nextTick: number = 0;

    constructor (fps: number, tps: number) {
        this.fps = fps;
        this.tps = tps;
        this.frameStart = 0;
        this.tickStart = 0;
        this.frameTime = [1000 / fps];
        this.tickTime = [1000 / tps];
        this.year = 1;
        this.season = 1;
        this.day = 1;
    }

    startTick(game: ColonyCraft) {
        game.clock.tickStart = performance.now();
        game.tick();
        const timePassed = performance.now() - game.clock.tickStart;
        game.clock.tickTime.push(Math.max(timePassed, 1000 / game.clock.tps));
        if (game.clock.tickTime.length > ClockController.TICK_CACHE_SIZE) game.clock.tickTime.shift();
        this.nextTick = window.setTimeout(() => game.clock.startTick(game), 1000 / game.clock.tps - timePassed);
    }

    startFrame(game: ColonyCraft) {
        game.render();
        const timePassed = performance.now() - game.clock.frameStart;
        game.clock.frameTime.push(Math.max(timePassed, 1000 / game.clock.fps));
        if (game.clock.frameTime.length > ClockController.FRAME_CACHE_SIZE) game.clock.frameTime.shift();
        game.clock.frameStart = performance.now();
        requestAnimationFrame(() => game.clock.startFrame(game));
    }

    stopTick() {
        clearTimeout(game.clock.nextTick);
    }

    getFPS (game: ColonyCraft): number {
        return 1000 / (game.clock.frameTime.reduce((a, b) => a + b) / game.clock.frameTime.length);
    }

    getFrameTime (game: ColonyCraft): number {
        return game.clock.frameTime.reduce((a, b) => a + b) / game.clock.frameTime.length;
    }

    getTPS (game: ColonyCraft): number {
        return 1000 / (game.clock.tickTime.reduce((a, b) => a + b) / game.clock.tickTime.length);
    }

    getTickTime (game: ColonyCraft): number {
        return game.clock.tickTime.reduce((a, b) => a + b) / game.clock.tickTime.length;
    }

    changeTPS (tps: number) {
        game.clock.tps = tps;
        game.clock.tickTime = [1000 / tps];
    }

    changeFPS (fps: number) {
        game.clock.fps = fps;
        game.clock.frameTime = [1000 / fps];
    }
}