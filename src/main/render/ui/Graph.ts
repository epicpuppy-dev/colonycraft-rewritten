import { ColonyCraft } from "../../ColonyCraft";
import { Statistic } from "../../content/stats/Statistic";

export class Graph {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public statistics: {[color: string]: {stat: Statistic, show: boolean}};
    public interval: string;
    public gridlinesX: number;
    public labelsX: string[];
    public gridlinesY: number; //number = auto (with number lines)
    public labelsY: string[] | null; //null = auto
    public min: number | null;
    public max: number | null;
    public points: number;

    private colors: {
        border: string,
        background: string,
        gridline: string,
        text: string
    }

    constructor (x: number, y: number, width: number, height: number, min: number | null, max: number | null, gridlinesX: number, labelsX: string[], gridlinesY: number, labelsY: string[] | null, interval: string, points: number, statistics: {[color: string]: Statistic}, 
        colors: {border: string, background: string, gridline: string, text: string} = {border: "#777777", background: "#222222", gridline: "#555555", text: "#ffffff"}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.min = min;
        this.max = max;
        this.gridlinesX = gridlinesX;
        this.labelsX = labelsX;
        this.gridlinesY = gridlinesY;
        this.labelsY = labelsY;
        this.interval = interval;
        this.points = points;
        this.statistics = {};
        for (const color in statistics) {
            this.statistics[color] = {stat: statistics[color], show: true};
        };
        this.colors = colors;
    }

    public render (game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D, percent: boolean = false, numbers: boolean = false) {
        ctx.lineWidth = 2;

        //draw inner gridlines
        ctx.strokeStyle = this.colors.gridline;
        for (let i = 0; i <= this.gridlinesX; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x + i * this.width / this.gridlinesX, this.y);
            ctx.lineTo(this.x + i * this.width / this.gridlinesX, this.y + this.height);
            ctx.stroke();
            game.draw.textSmallCenter(this.labelsX[i], this.x + this.width - i * this.width / this.gridlinesX, this.y + this.height + 6, 7, this.colors.text);
        }

        let max = this.max;
        let min = this.min;
        if (max === null) {
            max = 0;
            for (const color in this.statistics) {
                if (!this.statistics[color].show) continue;
                max = Math.max(max, this.statistics[color].stat.max(this.interval, this.points + 1));
            }
        }
        if (min === null) {
            min = max;
            for (const color in this.statistics) {
                if (!this.statistics[color].show) continue;
                min = Math.min(min, this.statistics[color].stat.max(this.interval, this.points + 1));
            }
        }

        let range = max - min;

        //generate labels
        let labels = this.labelsY;
        if (labels === null) {
            labels = [];
            for (let i = 0; i <= this.gridlinesY; i++) {
                labels.push(`${game.draw.toShortNumber(Math.round(min + i * range / this.gridlinesY))}`);
            }
        }

        for (let i = 0; i <= this.gridlinesY; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + i * this.height / this.gridlinesY);
            ctx.lineTo(this.x + this.width, this.y + i * this.height / this.gridlinesY);
            ctx.stroke();
            game.draw.textSmall(labels[i], this.x - game.draw.textSmallWidth(labels[i], 7) - 6, this.y + this.height - i * this.height / this.gridlinesY - 4, 7, this.colors.text);
        }
        
        //array storing y values already rendered
        let numberPos: number[] = [];
        //draw graph
        for (const color in this.statistics) {
            let i = 0;
            if (!this.statistics[color].show) continue;
            const stat = this.statistics[color].stat.data[this.interval];
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(this.x + this.width, this.y + this.height - stat.data[0] / range * this.height);
            for (const point of stat.data) {
                if (i > this.points) break;
                ctx.lineTo(this.x + this.width - i * this.width / this.points, this.y + this.height - point / range * this.height);
                i++;
            }
            ctx.stroke();
            if (numbers && stat.data[0]) {
                let y = Math.round(this.y + this.height - stat.data[0] / range * this.height - 4);
                while (true) {
                    let overlap = false;
                    for (const pos of numberPos) {
                        if (pos - y < 10 && pos - y >= 0) {
                            y -= 1;
                            overlap = true;
                            break;
                        } else if (pos - y > -10 && pos - y < 0) {
                            y += 1;
                            overlap = true;
                            break;
                        }
                    }
                    if (!overlap) break;
                }
                if (percent) game.draw.textSmall(`${(stat.data[0] * 100).toFixed(1)}%`, Math.floor(this.x + this.width + 6), y, 7, color);
                else if (!percent) game.draw.textSmall(`${game.draw.toShortNumber(Math.round(stat.data[0]))}`, Math.floor(this.x + this.width + 6), y, 7, color);
                numberPos.push(y);
            }
        }

        //draw border
        ctx.strokeStyle = this.colors.border;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}