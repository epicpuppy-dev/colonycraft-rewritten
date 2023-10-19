import { ColonyCraft } from "../ColonyCraft";

export class SimulationController {
    public running: boolean;

    constructor () {
        this.running = false;
    }

    public toggleRunning (game: ColonyCraft, running: boolean) {
        this.running = running;
        if (this.running) {
            game.clock.resetTickTime();
            game.clock.startTicking(game);
        } else {
            game.clock.stopTick();
        }
    }

    public changeSpeed (game: ColonyCraft, speed: number) {
        const newTPS = speed * 2;
        game.clock.changeTPS(newTPS);
    }
}