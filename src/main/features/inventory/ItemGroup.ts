import { Item } from "./Item";

export class ItemGroup {
    //localization key, also the internal id used to access the group
    //loc: inventory.groups.[key]
    public key: string;
    public items: Item[];
    public name: string;

    constructor(key: string, name: string) {
        this.key = key;
        this.name = name;
        this.items = [];
    }
}