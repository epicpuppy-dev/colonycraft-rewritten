import { ResearchUpdate } from "./ResearchUpdate";
import { Technology } from "./Technology";

export class ResearchManager {
    public technologies: {[key: string]: Technology} = {};
    public active: Technology | null = null;
    private update: ResearchUpdate;

    constructor () {
        this.update = new ResearchUpdate();
    }

    public registerTechnology (technology: Technology) {
        this.technologies[technology.id] = technology;
    }
}