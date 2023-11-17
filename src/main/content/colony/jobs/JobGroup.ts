import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { Job } from "./Job";

export class JobGroup implements Saveable {
    public key: string;
    public jobs: Job[] = [];
    public name: string;
    public priority: number;
    public minimized: boolean = false;

    constructor(game: ColonyCraft, key: string, name: string, priority: number) {
        this.key = key;
        this.name = name;
        this.priority = priority;
        game.save.register(this, "jobGroup." + this.key);
    }

    save(): string {
        if (!this.minimized) return "";
        else return "m";
    }

    load(data: string): void {
        if (data == "m") this.minimized = true;
    }

    newGame(): void {
        this.minimized = false;
    }
}