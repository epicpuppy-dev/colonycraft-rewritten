import { Item } from "./Item";

export class ItemGroup {
    //localization key, also the internal id used to access the group
    //loc: inventory -> groups -> [key]
    public key: string;
    public items: Item[];

    constructor(key: string) {
        this.key = key;
        this.items = [];
    }
}