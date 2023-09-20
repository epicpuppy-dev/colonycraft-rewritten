import { ColonyCraft } from "../ColonyCraft";

export class SimulationController {
    public running: boolean;

    constructor () {
        this.running = false;
    }

    public toggleRunning (running: boolean) {
        this.running = running;
        if (this.running) {
            setTimeout(ColonyCraft.clock.startTick, 1000 / ColonyCraft.clock.tps);
        } else {
            ColonyCraft.clock.stopTick();
        }
    }

    public changeSpeed (speed: number) {
        const newTPS = speed * 2;
        ColonyCraft.clock.changeTPS(newTPS);
    }
}