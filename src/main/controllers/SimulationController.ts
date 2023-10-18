import { game } from "../../index";

export class SimulationController {
    public running: boolean;

    constructor () {
        this.running = false;
    }

    public toggleRunning (running: boolean) {
        this.running = running;
        if (this.running) {
            game.clock.resetTickTime();
            setTimeout(() => game.clock.startTick(game), 1000 / game.clock.tps);
        } else {
            game.clock.stopTick();
        }
    }

    public changeSpeed (speed: number) {
        const newTPS = speed * 2;
        game.clock.changeTPS(newTPS);
    }
}