import { ColonyCraft } from "../../../ColonyCraft";
import { Saveable } from "../../../saving/Saveable";
import { ResearchUpdate } from "./ResearchUpdate";
import { Technology } from "./Technology";

export class ResearchManager implements Saveable {
    public technologies: {[key: string]: Technology} = {};
    public active: Technology | null = null;
    private update: ResearchUpdate;

    constructor (game: ColonyCraft) {
        this.update = new ResearchUpdate(game);

        game.save.register(this, "res");
    }

    public registerTechnology (technology: Technology) {
        this.technologies[technology.id] = technology;
    }

    public save (): string {
        if (this.active != null) return `${this.active.id}`;
        else return " ";
    }

    public load (data: string) {
        if (data == " ") {
            this.active = null;
        }
        if (this.technologies[data]) this.active = this.technologies[data];
    }

    public newGame() {
        this.active = null;
    }
}