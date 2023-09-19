export class Item {
    //localization key, also the internal id used to access the item
    //loc: inventory -> items -> [key]
    public key: string;
    //size per 1 unit of item
    public volume: number;
    //current stock
    public amount: number;

    constructor(key: string, volume: number, amount: number = 0) {
        this.key = key;
        this.volume = volume;
        this.amount = amount;
    }
}