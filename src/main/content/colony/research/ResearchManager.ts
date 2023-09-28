import { ColonyCraft } from "../../../ColonyCraft";
import { ResearchUpdate } from "./ResearchUpdate";
import { Technology } from "./Technology";

export class ResearchManager {
    public technologies: {[key: string]: Technology} = {};
    public active: Technology | null = null;
    private update: ResearchUpdate;

    constructor (game: ColonyCraft) {
        this.update = new ResearchUpdate(game);
    }

    public registerTechnology (technology: Technology) {
        this.technologies[technology.id] = technology;
    }
}