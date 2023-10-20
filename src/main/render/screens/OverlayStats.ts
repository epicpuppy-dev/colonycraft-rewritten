import { ColonyCraft } from "../../ColonyCraft";
import { KeyAction } from "../../player/KeyAction";
import { KeyBind } from "../../player/KeyBind";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { Graph } from "../ui/Graph";

export class OverlayStats extends Screen {
    private closeButton: Button;
    private dailyButton: Button;
    private quarterlyButton: Button;
    private yearlyButton: Button;
    private populationButton: Button;
    private welfareButton: Button;
    private graphs: {[type: string]: Graph};
    private intervals: {[key: string]: [number, string[], number]} = {
        "daily": [6, ["Now", "20d", "40d", "60d", "80d", "100d", "120d"], 60],
        "quarterly": [5, ["Now", "2y", "4y", "6y", "8y", "10y"], 40],
        "yearly": [5, ["Now", "10y", "20y", "30y", "40y", "50y"], 50]
    };
    private interval: string = "daily";
    private type: string = "population";

    constructor (game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("stats"), 1);
            game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("stats");
        });
        
        game.mouse.registerClickable(this.closeButton);

        game.key.addAction(new KeyAction("closeStats", "Close Stats", (game: ColonyCraft) => {
            if (game.currentScreens.includes("stats")) {
                game.currentScreens.splice(game.currentScreens.indexOf("stats"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));
        game.draw.addCloseAction(game.key.actions.closeStats);

        game.key.addAction(new KeyAction("openStats", "Open Stats", (game: ColonyCraft) => {
            if (game.currentScreens.includes("game") && !game.currentScreens.includes("overlay")) game.currentScreens.push("stats", "overlay");
            else if (game.currentScreens.includes("stats")) {
                game.currentScreens.splice(game.currentScreens.indexOf("stats"), 1);
                game.currentScreens.splice(game.currentScreens.indexOf("overlay"), 1);
            }
        }));
        
        game.key.addBinding(new KeyBind("Open Stats", "Tab", "Tab", [game.key.actions.openStats]));

        this.populationButton = new Button(Math.floor(this.width / 2 - 150), Math.floor(this.height / 4 - 32), 150, 24, (game: ColonyCraft) => {
            this.type = "population";
        }, (game: ColonyCraft) => game.currentScreens.includes("stats"));
        this.welfareButton = new Button(Math.floor(this.width / 2), Math.floor(this.height / 4 - 32), 150, 24, (game: ColonyCraft) => {
            this.type = "welfare";
        }, (game: ColonyCraft) => game.currentScreens.includes("stats"));

        game.mouse.registerClickable(this.populationButton);
        game.mouse.registerClickable(this.welfareButton);

        this.dailyButton = new Button(Math.floor(this.width / 2 - 90), Math.floor(13 * this.height / 16 - 12), 60, 24, (game: ColonyCraft) => {
            this.changeInterval("daily");
        }, (game: ColonyCraft) => game.currentScreens.includes("stats"));
        this.quarterlyButton = new Button(Math.floor(this.width / 2 - 30), Math.floor(13 * this.height / 16 - 12), 60, 24, (game: ColonyCraft) => {
            this.changeInterval("quarterly");
        }, (game: ColonyCraft) => game.currentScreens.includes("stats"));
        this.yearlyButton = new Button(Math.floor(this.width / 2 + 30), Math.floor(13 * this.height / 16 - 12), 60, 24, (game: ColonyCraft) => {
            this.changeInterval("yearly");
        }, (game: ColonyCraft) => game.currentScreens.includes("stats"));

        game.mouse.registerClickable(this.dailyButton);
        game.mouse.registerClickable(this.quarterlyButton);
        game.mouse.registerClickable(this.yearlyButton);

        this.graphs = {
            welfare: new Graph(Math.floor(this.width / 4), Math.floor(this.height / 4), Math.floor(this.width / 2), Math.floor(this.height / 2), 0, 1, 6, ["Now", "20d", "40d", "60d", "80d", "100d", "120d"], 4, ["0%", "25%", "50%", "75%", "100%"], "daily", 60, {"#dc1414": game.stats.stats.health, "#dcd614": game.stats.stats.morale}),
            population: new Graph(Math.floor(this.width / 4), Math.floor(this.height / 4), Math.floor(this.width / 2), Math.floor(this.height / 2), 0, null, 6, ["Now", "20d", "40d", "60d", "80d", "100d", "120d"], 4, null, "daily", 60, {"#ffffff": game.stats.stats.population, "#98fb98": game.stats.stats.babies, "#48d1cc": game.stats.stats.children, "#6495ed": game.stats.stats.adults, "#9370db": game.stats.stats.seniors})
        };
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.fillStyle = '#00000077';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.roundRect(Math.floor(this.width / 8), Math.floor(this.height / 8), Math.floor(3 * this.width / 4), Math.floor(3 * this.height / 4), 10);
        ctx.fillStyle = "#222222";
        ctx.fill();
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.stroke();
        game.draw.sprite(ctx, "close", Math.floor(7 * this.width / 8 - 31), Math.floor(this.height / 8 + 6), 24, 24);
        game.draw.textCenter("Colony Statistics", Math.floor(this.width / 2), Math.floor(this.height / 8 + 12), 28, "white");

        //draw type selector
        ctx.fillStyle = '#444444';
        if (this.type == "population") ctx.fillRect(Math.floor(this.width / 2 - 150), Math.floor(this.height / 4 - 32), 150, 24);
        ctx.strokeRect(Math.floor(this.width / 2 - 150), Math.floor(this.height / 4 - 32), 150, 24);
        game.draw.textCenter("Population", Math.floor(this.width / 2 - 75), Math.floor(this.height / 4 - 28), 14, "white");
        if (this.type == "welfare") ctx.fillRect(Math.floor(this.width / 2), Math.floor(this.height / 4 - 32), 150, 24);
        ctx.strokeRect(Math.floor(this.width / 2), Math.floor(this.height / 4 - 32), 150, 24);
        game.draw.textCenter("Welfare", Math.floor(this.width / 2 + 75), Math.floor(this.height / 4 - 28), 14, "white");

        //draw time selector
        if (this.interval == "daily") ctx.fillRect(Math.floor(this.width / 2 - 90), Math.floor(13 * this.height / 16 - 12), 60, 24);
        ctx.strokeRect(Math.floor(this.width / 2 - 90), Math.floor(13 * this.height / 16 - 12), 60, 24);
        game.draw.textCenter("1y", Math.floor(this.width / 2 - 60), Math.floor(13 * this.height / 16 - 8), 14, "white");
        if (this.interval == "quarterly") ctx.fillRect(Math.floor(this.width / 2 - 30), Math.floor(13 * this.height / 16 - 12), 60, 24);
        ctx.strokeRect(Math.floor(this.width / 2 - 30), Math.floor(13 * this.height / 16 - 12), 60, 24);
        game.draw.textCenter("10y", Math.floor(this.width / 2), Math.floor(13 * this.height / 16 - 8), 14, "white");
        if (this.interval == "yearly") ctx.fillRect(Math.floor(this.width / 2 + 30), Math.floor(13 * this.height / 16 - 12), 60, 24);
        ctx.strokeRect(Math.floor(this.width / 2 + 30), Math.floor(13 * this.height / 16 - 12), 60, 24);
        game.draw.textCenter("50y", Math.floor(this.width / 2 + 60), Math.floor(13 * this.height / 16 - 8), 14, "white");

        //draw graph
        this.graphs[this.type].render(game, ctx, this.type == "welfare", true);

        //draw graph key
        let i = 0;
        for (const color in this.graphs[this.type].statistics) {
            ctx.fillStyle = color;
            ctx.fillRect(Math.floor(this.width / 8 + 8), Math.floor(this.height / 4 + 8 + 24 * i), 16, 16);
            ctx.strokeRect(Math.floor(this.width / 8 + 8), Math.floor(this.height / 4 + 8 + 24 * i), 16, 16);
            game.draw.text(this.graphs[this.type].statistics[color].stat.name, Math.floor(this.width / 8 + 32), Math.floor(this.height / 4 + 9 + 24 * i), 14, color);
            i++;
        }

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("stats");
    }

    public changeInterval (interval: string) {
        this.interval = interval;
        for (const graph in this.graphs) {
            this.graphs[graph].interval = this.interval;
            this.graphs[graph].gridlinesX = this.intervals[this.interval][0];
            this.graphs[graph].labelsX = this.intervals[this.interval][1];
            this.graphs[graph].points = this.intervals[this.interval][2];
        }
    }
}