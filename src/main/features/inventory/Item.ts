export class Item {
    //localization key
    //loc: items -> [key]
    private key: string;
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