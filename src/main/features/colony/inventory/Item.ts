export class Item {
    //localization key, also the internal id used to access the item
    //loc: inventory.items.[key]
    public key: string;
    //size per 1 unit of item
    public volume: number;
    //current stock
    public amount: number = 0;
    public name: string;

    constructor(key: string, volume: number, name: string) {
        this.key = key;
        this.volume = volume;
        this.name = name;
    }
}