import { ColonyCraft } from "../../../ColonyCraft";
import { Job } from "../../../content/colony/jobs/Job";
import { CraftingJob } from "../../../content/colony/jobs/custom/CraftingJob";
import { ResourceJob } from "../../../content/colony/jobs/custom/ResourceJob";
import { SeasonalResourceJob } from "../../../content/colony/jobs/custom/SeasonalResourceJob";
import { LootTable } from "../../../content/loot/LootTable";
import { PanelJobs } from "../../screens/PanelJobs";
import { Tooltip } from "../Tooltip";

export class JobPanelTooltip extends Tooltip {
    constructor(game: ColonyCraft, screen: PanelJobs, id: string, x: number, y: number, width: number, height: number, active: (game: ColonyCraft) => boolean, 
        jobIndex: number, 
        hoverTime: number = 0.5) {
        super(game, id, [{text: (game: ColonyCraft) => screen.jobsAvailable[jobIndex].name, color: "#FFFFFF"}], x, y, width, height, (game) => active(game) && screen.jobsAvailable.length >= jobIndex - 1 && screen.jobsAvailable[jobIndex] instanceof Job, undefined, hoverTime);
        this.lines = (game: ColonyCraft) => {
            let job = screen.jobsAvailable[jobIndex];
            if (!(job instanceof Job)) return [];
            let text: {text: string | ((game: ColonyCraft) => string), color: string}[] = [
                {text: job.desc, color: "#FFFFFF"},
                {text: `Currently Assigned: ${game.draw.toShortNumber(job.workersAssigned)}`, color: "#FFFFFF"},
            ];
            if (job.maxWorkers(game) !== Infinity) {
                text.push({text: `Max Assigned: ${game.draw.toShortNumber(job.maxWorkers(game))}`, color: "#FFFFFF"});
            }
            if (screen.viewExtraKeyBind.keyheld) {
                if (job instanceof SeasonalResourceJob) {
                    //Add seasonal loot table if it is a seasonal job
                    text.push({text: `Gathers resources ${game.draw.toShortNumber(job.rolls * job.table.rolls)} time${(job.rolls * job.table.rolls) == 1 ? '' : 's'} per day: (${game.draw.toShortNumber(job.rolls * job.table.rolls * job.workersAssigned)} total)`, color: "#55FF55"});
                    for (let entry of job.table.items) {
                        if (entry.item !== null) {
                            text.push({text: `  ${(entry.weight / job.table.totalWeight * 100).toFixed(1)}% ${entry.amount}x ${entry.item.name}`, color: "#FFFFFF"});
                        } else {
                            text.push({text: `  ${(entry.weight / job.table.totalWeight * 100).toFixed(1)}% Nothing`, color: "#FFFFFF"});
                        }
                    }
                    text.push({text: `Production varies by season:`, color: "#FFFF55"});
                    text.push({text: `  Spring: ${job.seasons[0]}x`, color: "#77FFBB"});
                    text.push({text: `  Summer: ${job.seasons[1]}x`, color: "#FFFF77"});
                    text.push({text: `  Fall: ${job.seasons[2]}x`, color: "#FFBB77"});
                    text.push({text: `  Winter: ${job.seasons[3]}x`, color: "#77DDFF"});
                } else if (job instanceof ResourceJob) {
                    //Add loot table if it is a resource job
                    text.push({text: `Gathers resources ${game.draw.toShortNumber(job.rolls * job.table.rolls)} time${(job.rolls * job.table.rolls) == 1 ? '' : 's'} per day: (${game.draw.toShortNumber(job.rolls * job.table.rolls * job.workersAssigned)} total)`, color: "#55FF55"});
                    for (let entry of job.table.items) {
                        if (entry.item !== null) {
                            text.push({text: `  ${(entry.weight / job.table.totalWeight * 100).toFixed(1)}% ${entry.amount}x ${entry.item.name}`, color: "#FFFFFF"});
                        } else {
                            text.push({text: `  ${(entry.weight / job.table.totalWeight * 100).toFixed(1)}% Nothing`, color: "#FFFFFF"});
                        }
                    }
                } else if (job instanceof CraftingJob) {
                    //Add crafting recipe if it is a crafting job
                    text.push({text: `Crafts ${game.draw.toShortNumber(job.crafts)} time${job.crafts == 1 ? '' : 's'} per day: (${game.draw.toShortNumber(job.crafts * job.workersAssigned)} total)`, color: "#55FF55"});
                    for (let entry of job.recipe.inputs) {
                        text.push({text: `  ${entry.amount}x ${entry.item.name}`, color: "#FFFFFF"});
                    }
                    text.push({text: `into:`, color: "#55FFFF"});
                    let output = job.recipe.outputs;
                    if (output instanceof LootTable) {
                        text.push({text: `  ${output.rolls}x`, color: "#FFFFFF"});
                        for (let entry of output.items) {
                            if (entry.item !== null) {
                                text.push({text: `    ${(entry.weight / output.totalWeight * 100).toFixed(1)}% ${entry.amount}x ${entry.item.name}`, color: "#FFFFFF"});
                            } else {
                                text.push({text: `    ${(entry.weight / output.totalWeight * 100).toFixed(1)}% Nothing`, color: "#FFFFFF"});
                            }
                        }
                    } else {
                        for (let entry of output) {
                            text.push({text: `  ${entry.amount}x ${entry.item.name}`, color: "#FFFFFF"});
                        }
                    }
                }
            } else {
                text.push({text: `Hold ${screen.viewExtraKeyBind.key} for more info`, color: "#FFFF55"});
            }
            
            return text;
        }
    }
}