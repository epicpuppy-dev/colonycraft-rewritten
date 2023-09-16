import { ColonyCraft } from "../ColonyCraft";

export class SimulationController {
    public running: boolean;

    constructor () {
        this.running = false;
    }

    public toggle () {
        this.running = !this.running;
    }

    public changeSpeed (speed: number) {
        const newTPS = speed * 2;
        ColonyCraft.clock.changeTPS(newTPS);
    }
}