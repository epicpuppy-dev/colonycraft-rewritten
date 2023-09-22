import { Job } from "./Job";

export class Jobs {
    public jobs: { [key: string]: Job } = {};
    public workersAssigned: number = 0;
}