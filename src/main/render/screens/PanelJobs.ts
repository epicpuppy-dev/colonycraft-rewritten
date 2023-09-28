import { game } from "../../..";
import { ColonyCraft } from "../../ColonyCraft";
import { Job } from "../../features/colony/jobs/Job";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ClickHandler } from "../ui/ClickHandler";

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

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.plusButton = new Button(Math.floor(5 * this.width / 6) + 38, 100, 21, 21, () => {
            this.increaseIndex = Math.min(this.increaseSteps.length - 1, this.increaseIndex + 1);
        }, (game) => game.currentScreens.includes("game") && game.currentScreens.length == 1);
        this.minusButton = new Button(Math.floor(5 * this.width / 6) - 62, 100, 21, 21, () => {
            this.increaseIndex = Math.max(0, this.increaseIndex - 1);
        }, (game) => game.currentScreens.includes("game") && game.currentScreens.length == 1);

        const maxRows = Math.floor((this.height - 138) / 40);

        this.plusClickable = new ClickHandler(0, 140, this.width, 21 + 40 * maxRows, (game, x, y) => {
            if (x < Math.floor(5 * this.width / 6) + this.buttonOffset - 12 || x > Math.floor(5 * this.width / 6) + this.buttonOffset + 12) return;
            const yRelative = y - 140;
            const yLeft = yRelative % 40;
            if (yLeft > 21) return;
            const row = Math.floor(yRelative / 40);
            if (row > this.jobsAvailable.length - 1) return;
            this.plus(game, row);
        }, (game) => game.currentScreens.includes("game") && game.currentScreens.length == 1);
        this.minusClickable = new ClickHandler(0, 140, this.width, 21 + 40 * maxRows, (game, x, y) => {
            if (x < Math.floor(5 * this.width / 6) - this.buttonOffset - 12 || x > Math.floor(5 * this.width / 6) - this.buttonOffset + 12) return;
            const yRelative = y - 140;
            const yLeft = yRelative % 40;
            if (yLeft > 21) return;
            const row = Math.floor(yRelative / 40);
            if (row > this.jobsAvailable.length - 1) return;
            this.minus(game, row);
        }, (game) => game.currentScreens.includes("game") && game.currentScreens.length == 1);

        game.mouse.registerClickable(this.plusButton);
        game.mouse.registerClickable(this.minusButton);

        game.mouse.registerClickable(this.plusClickable);
        game.mouse.registerClickable(this.minusClickable);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        ctx.fillStyle = "#222222";
        ctx.fillRect(Math.floor(2 * this.width / 3), -50, Math.floor(2 * this.width / 3) + 50, this.height + 1000);
        ctx.strokeStyle = '#777777';
        ctx.lineWidth = 2;
        ctx.strokeRect(Math.floor(2 * this.width / 3), -50, Math.floor(2 * this.width / 3) + 50, this.height + 1000);

        game.draw.textCenter("Jobs", Math.floor(5 * this.width / 6), 62, 21, "#FFFFFF");

        const maxRows = Math.floor((this.height - 138) / 40);
        let row = 0;

        game.draw.textSmallCenter("Modify By:", Math.floor(5 * this.width / 6), 98, 7, "#FFFFFF");
        game.draw.textCenter(this.increaseSteps[this.increaseIndex][1], Math.floor(5 * this.width / 6), 110, 14, "#FFFFFF");
        ctx.beginPath();
        ctx.roundRect(Math.floor(5 * this.width / 6) - 62, 100, 21, 21, 3);
        ctx.roundRect(Math.floor(5 * this.width / 6) + 38, 100, 21, 21, 3);
        ctx.stroke();
        game.draw.textCenter("+", Math.floor(5 * this.width / 6) + 50, 100, 21, "#FFFFFF");
        game.draw.textCenter("-", Math.floor(5 * this.width / 6) - 50, 100, 21, "#FFFFFF");

        const jobs = game.colony.jobs.jobs;
        let maxWidth = 0;

        for (const job in jobs) {
            if (row >= maxRows + this.rowScroll) break;
            if (row < this.rowScroll) continue;
            if (jobs[job].unlocked(game)) {
                this.jobsAvailable.push(jobs[job]);
                maxWidth = Math.max(maxWidth, game.draw.textWidth(jobs[job].name, 14));
                game.draw.textCenter(jobs[job].name, Math.floor(5 * this.width / 6), 130 + 40 * row, 14, "#FFFFFF");
                if (jobs[job].maxWorkers(game) !== Infinity) {
                    game.draw.textCenter(game.draw.toShortNumber(jobs[job].workersAssigned) + " / " + game.draw.toShortNumber(jobs[job].maxWorkers(game)), Math.floor(5 * this.width / 6), 150 + 40 * row, 14, "#FFFFFF");
                } else {
                    game.draw.textCenter(game.draw.toShortNumber(jobs[job].workersAssigned), Math.floor(5 * this.width / 6), 150 + 40 * row, 14, "#FFFFFF");
                }
                game.draw.textCenter("+", Math.floor(5 * this.width / 6) + this.buttonOffset, 140 + 40 * row, 21, "#FFFFFF");
                game.draw.textCenter("-", Math.floor(5 * this.width / 6) - this.buttonOffset, 140 + 40 * row, 21, "#FFFFFF");
                ctx.beginPath();
                ctx.roundRect(Math.floor(5 * this.width / 6) - this.buttonOffset - 12, 140 + 40 * row, 21, 21, 3);
                ctx.roundRect(Math.floor(5 * this.width / 6) + this.buttonOffset - 12, 140 + 40 * row, 21, 21, 3);
                ctx.stroke();
                row++;
            }
        }

        this.buttonOffset = Math.floor(maxWidth / 2 + 24);

        game.draw.renderText(ctx);
    }

    private plus(game: ColonyCraft, index: number) {
        const job = this.jobsAvailable[index];
        job.assign(game, Math.min(Math.max(game.colony.population.adults - game.colony.jobs.workersAssigned, 0), job.maxWorkers(game) - job.workersAssigned, this.increaseSteps[this.increaseIndex][0]));
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