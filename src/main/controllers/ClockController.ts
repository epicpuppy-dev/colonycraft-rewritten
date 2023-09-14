import { ColonyCraft } from "../ColonyCraft";

export class ClockController {
    private static FRAME_CACHE_SIZE: number = 60;
    private static TICK_CACHE_SIZE: number = 10;
    private frameTime: number[];
    private tickTime: number[];
    private frameStart: number;
    private tickStart: number;
    private fps: number;
    private tps: number;

    constructor (fps: number, tps: number) {
        this.fps = fps;
        this.tps = tps;
        this.frameStart = performance.now();
        this.tickStart = performance.now();
        this.frameTime = [1000 / fps];
        this.tickTime = [1000 / tps];
    }

    startTick() {
        ColonyCraft.tick();
        const timePassed = performance.now() - ColonyCraft.clock.tickStart;
        ColonyCraft.clock.tickTime.push(Math.max(timePassed, 1000 / ColonyCraft.clock.tps));
        if (ColonyCraft.clock.tickTime.length > ClockController.TICK_CACHE_SIZE) ColonyCraft.clock.tickTime.shift();
        setTimeout(ColonyCraft.clock.startTick, Math.max((1000 / ColonyCraft.clock.tps) - timePassed), 0);
        ColonyCraft.clock.tickStart = performance.now();
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
}