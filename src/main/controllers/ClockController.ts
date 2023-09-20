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
    private fps: number;
    private tps: number;

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

    startTick() {
        ColonyCraft.clock.tickStart = performance.now();
        ColonyCraft.tick();
        const timePassed = performance.now() - ColonyCraft.clock.tickStart;
        ColonyCraft.clock.tickTime.push(Math.max(timePassed, 1000 / ColonyCraft.clock.tps));
        if (ColonyCraft.clock.tickTime.length > ClockController.TICK_CACHE_SIZE) ColonyCraft.clock.tickTime.shift();
        setTimeout(ColonyCraft.clock.startTick, 1000 / ColonyCraft.clock.tps - timePassed);
    }

    startFrame() {
        ColonyCraft.render();
        const timePassed = performance.now() - ColonyCraft.clock.frameStart;
        ColonyCraft.clock.frameTime.push(Math.max(timePassed, 1000 / ColonyCraft.clock.fps));
        if (ColonyCraft.clock.frameTime.length > ClockController.FRAME_CACHE_SIZE) ColonyCraft.clock.frameTime.shift();
        ColonyCraft.clock.frameStart = performance.now();
        requestAnimationFrame(ColonyCraft.clock.startFrame);
    }

    getFPS (): number {
        return 1000 / (ColonyCraft.clock.frameTime.reduce((a, b) => a + b) / ColonyCraft.clock.frameTime.length);
    }

    getFrameTime (): number {
        return ColonyCraft.clock.frameTime.reduce((a, b) => a + b) / ColonyCraft.clock.frameTime.length;
    }

    getTPS (): number {
        return 1000 / (ColonyCraft.clock.tickTime.reduce((a, b) => a + b) / ColonyCraft.clock.tickTime.length);
    }

    getTickTime (): number {
        return ColonyCraft.clock.tickTime.reduce((a, b) => a + b) / ColonyCraft.clock.tickTime.length;
    }

    changeTPS (tps: number) {
        ColonyCraft.clock.tps = tps;
        ColonyCraft.clock.tickTime = [1000 / tps];
    }

    changeFPS (fps: number) {
        ColonyCraft.clock.fps = fps;
        ColonyCraft.clock.frameTime = [1000 / fps];
    }
}