import { game } from "../../..";
import { ColonyCraft } from "../../ColonyCraft";
import { Job } from "../../content/colony/jobs/Job";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ClickHandler } from "../ui/ClickHandler";
import { ScrollBar } from "../ui/ScrollBar";

export class PanelJobs extends Screen {
    private increaseIndex: number = 0;
    private increaseSteps: [number, string][] = [[1, "1"], [10, "10"], [100, "100"], [1000, "1k"], [10000, "10k"], [100000, "100k"], [1000000, "1m"], [10000000, "10m"], [100000000, "100m"], [1000000000, "1b"]];
    private rowScroll: number = 0;
    private plusButton: Button;
    private minusButton: Button;
    private plusClickable: ClickHandler;
    private minusClickable: ClickHandler;
    private jobsAvailable: Job[] = [];
    private buttonOffset: number = 100;
    private scrollBar: ScrollBar;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.plusButton = new Button(Math.floor(5 * this.width / 6) + 38, 100, 21, 21, () => {
            this.increaseIndex = Math.min(this.increaseSteps.length - 1, this.increaseIndex + 1);
        }, (game) => game.currentScreens.includes("game") && game.currentScreens.length == 1);
        this.minusButton = new Button(Math.floor(5 * this.width / 6) - 62, 100, 21, 21, () => {
            this.increaseIndex = Math.max(0, this.increaseIndex - 1);
        }, (game) => game.currentScreens.includes("game") && game.currentScreens.length == 1);

        const maxRows = Math.floor((this.height - 138) / 50);

        this.plusClickable = new ClickHandler(0, 136, this.width, 21 + 50 * maxRows, (game, x, y) => {
            if (x < Math.floor(5 * this.width / 6) + this.buttonOffset - 12 || x > Math.floor(5 * this.width / 6) + this.buttonOffset + 12) return;
            const yRelative = y - 136;
            const yLeft = yRelative % 50;
            if (yLeft > 21) return;
            const row = Math.floor(yRelative / 50);
            if (row > this.jobsAvailable.length - 1) return;
            this.plus(game, row);
        }, (game) => game.currentScreens.includes("game") && game.currentScreens.length == 1);
        this.minusClickable = new ClickHandler(0, 136, this.width, 21 + 50 * maxRows, (game, x, y) => {
            if (x < Math.floor(5 * this.width / 6) - this.buttonOffset - 12 || x > Math.floor(5 * this.width / 6) - this.buttonOffset + 12) return;
            const yRelative = y - 136;
            const yLeft = yRelative % 50;
            if (yLeft > 21) return;
            const row = Math.floor(yRelative / 50);
            if (row > this.jobsAvailable.length - 1) return;
            this.minus(game, row);
        }, (game) => game.currentScreens.includes("game") && game.currentScreens.length == 1);

        game.mouse.registerClickable(this.plusButton);
        game.mouse.registerClickable(this.minusButton);

        game.mouse.registerClickable(this.plusClickable);
        game.mouse.registerClickable(this.minusClickable);

        this.scrollBar = new ScrollBar(game, Math.floor(this.width - 24), 130, 16, Math.floor(this.height - 142), "v", 0, 5, 5, 40, (game, x, y) => {
            return game.currentScreens.includes("game") && 
                !game.currentScreens.includes("overlay") &&
                x > Math.floor(2 * this.width / 3) &&
                x < Math.floor(this.width) &&
                y > 50 && y < Math.floor(this.height);
        });
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.fillStyle = "#222222";
        ctx.fillRect(Math.floor(2 * this.width / 3), -50, Math.floor(2 * this.width / 3) + 50, this.height + 1000);
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.strokeRect(Math.floor(2 * this.width / 3), -50, Math.floor(2 * this.width / 3) + 50, this.height + 1000);

        game.draw.textCenter("Jobs", Math.floor(5 * this.width / 6), 62, 21, "#FFFFFF");

        const maxRows = Math.floor((this.height - 138) / 50);
        let row = 0;
        this.rowScroll = Math.max(this.scrollBar.value, 0);

        game.draw.textSmallCenter("Modify By:", Math.floor(5 * this.width / 6), 98, 7, "#FFFFFF");
        game.draw.textCenter(this.increaseSteps[this.increaseIndex][1], Math.floor(5 * this.width / 6), 110, 14, "#FFFFFF");
        ctx.beginPath();
        ctx.roundRect(Math.floor(5 * this.width / 6) - 62, 100, 21, 21, 3);
        ctx.roundRect(Math.floor(5 * this.width / 6) + 38, 100, 21, 21, 3);
        ctx.stroke();
        game.draw.textCenter("+", Math.floor(5 * this.width / 6) + 50, 100, 21, "#FFFFFF");
        game.draw.textCenter("-", Math.floor(5 * this.width / 6) - 50, 100, 21, "#FFFFFF");

        const jobs = game.colony.jobs;
        let maxWidth = game.draw.textWidth("1.23k/1.23k", 14);
        this.jobsAvailable = [];

        for (const job of jobs.jobPriority) {
            if (jobs.jobs[job].unlocked(game)) {
                if (row >= this.rowScroll && row < this.rowScroll + maxRows) {
                    this.jobsAvailable.push(jobs.jobs[job]);
                    maxWidth = Math.max(maxWidth, game.draw.textWidth(jobs.jobs[job].name, 14));
                    game.draw.textCenter(jobs.jobs[job].name, Math.floor(5 * this.width / 6), 130 + 50 * (row - this.rowScroll), 14, "#FFFFFF");
                    if (jobs.jobs[job].maxWorkers(game) !== Infinity) {
                        game.draw.textCenter(game.draw.toShortNumber(jobs.jobs[job].workersAssigned) + "/" + game.draw.toShortNumber(jobs.jobs[job].maxWorkers(game)), Math.floor(5 * this.width / 6), 150 + 50 * (row - this.rowScroll), 14, "#FFFFFF");
                    } else {
                        game.draw.textCenter(game.draw.toShortNumber(jobs.jobs[job].workersAssigned), Math.floor(5 * this.width / 6), 150 + 50 * (row - this.rowScroll), 14, "#FFFFFF");
                    }
                    game.draw.textSmallCenter(jobs.jobs[job].desc, Math.floor(5 * this.width / 6), 168 + 50 * (row - this.rowScroll), 7, "#FFFFFF");
                    game.draw.textCenter("+", Math.floor(5 * this.width / 6) + this.buttonOffset, 136 + 50 * (row - this.rowScroll), 21, "#FFFFFF");
                    game.draw.textCenter("-", Math.floor(5 * this.width / 6) - this.buttonOffset, 136 + 50 * (row - this.rowScroll), 21, "#FFFFFF");
                    ctx.beginPath();
                    ctx.roundRect(Math.floor(5 * this.width / 6) - this.buttonOffset - 12, 136 + 50 * (row - this.rowScroll), 21, 21, 3);
                    ctx.roundRect(Math.floor(5 * this.width / 6) + this.buttonOffset - 12, 136 + 50 * (row - this.rowScroll), 21, 21, 3);
                    ctx.stroke();
                }
                row++;
            }
        }

        this.buttonOffset = Math.floor(maxWidth / 2 + 24);

        this.scrollBar.setBounds(this.rowScroll, maxRows, Math.floor(row - maxRows));

        this.scrollBar.render(ctx);

        game.draw.renderText(ctx);
    }

    private plus(game: ColonyCraft, index: number) {
        const job = this.jobsAvailable[index];
        job.assign(game, Math.min(Math.max(game.colony.population.adults - game.colony.jobs.workersAssigned, 0), job.maxWorkers(game) - job.workersAssigned, this.increaseSteps[this.increaseIndex][0], job.cost ? Math.floor(job.cost.item.amount / job.cost.amount) : Infinity));
    }

    private minus(game: ColonyCraft, index: number) {
        const job = this.jobsAvailable[index];
        job.unassign(game, Math.min(job.workersAssigned, this.increaseSteps[this.increaseIndex][0]));
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("game");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.plusButton.reposition(Math.floor(5 * this.width / 6) + 38, 100, 21, 21);
        this.minusButton.reposition(Math.floor(5 * this.width / 6) - 62, 100, 21, 21);
    }

}