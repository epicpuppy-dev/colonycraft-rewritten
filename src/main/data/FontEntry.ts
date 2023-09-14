export class FontEntry {
    public char: string;
    public x: number;
    public y: number;
    public width: number;

    constructor (char: string, x: number, y: number, width: number) {
        this.char = char;
        this.x = x;
        this.y = y;
        this.width = width;
    }
}