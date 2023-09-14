export class ColonyCraft {
    public static width: number;
    public static height: number;
    public static canvas: HTMLCanvasElement;

    static main () {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.appendChild(this.canvas);
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
    }
}