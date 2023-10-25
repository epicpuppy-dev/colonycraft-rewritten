import { Job } from "./Job";

export class JobGroup {
    //localization key, also the internal id used to access the group
    //loc: inventory.groups.[key]
    public key: string;
    public jobs: Job[];
    public name: string;

    constructor(key: string, name: string) {
        this.key = key;
        this.name = name;
        this.jobs = [];
    }
}