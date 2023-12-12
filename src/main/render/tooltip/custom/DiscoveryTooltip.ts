import { ColonyCraft } from "../../../ColonyCraft";
import { Technology } from "../../../content/colony/research/Technology";
import { Trait } from "../../../content/colony/traits/Trait";
import { ScreenResearch } from "../../screens/ScreenResearch";
import { Tooltip } from "../Tooltip";

export class DiscoveryTooltip extends Tooltip {
    constructor(game: ColonyCraft, screen: ScreenResearch, id: string, x: number, y: number, width: number, height: number, active: (game: ColonyCraft) => boolean, hoverTime: number = 0) {
        super(game, id, [{text: (game) => game.colony.getUnlockable(screen.hover).name, color: "#ffffff"}], x, y, width, height, active, undefined, hoverTime);
        this.lines = (game: ColonyCraft) => {
            let unlockable = game.colony.getUnlockable(screen.hover);
            if (unlockable === null) return [];
            let text: {text: string | ((game: ColonyCraft) => string), color: string}[] = [];
            if (unlockable instanceof Technology) {
                if (unlockable.type == "progress") {
                    text.push({text: "Unlocks further progress", color: "yellow"});
                } else if (unlockable.type == "food") {
                    text.push({text: "Unlocks further food production", color: "cyan"});
                }

                for (let desc of unlockable.desc) {
                    text.push({text: desc, color: "#ffffff"});
                }

                if (!unlockable.unlocked) {
                    let active = game.colony.research.active;
                    if (unlockable.needed.invention > 0) text.push({text: (unlockable.progress > 0 || unlockable === active ? (game.draw.toShortNumber(unlockable.current.invention) + "/") : "") + game.draw.toShortNumber(unlockable.needed.invention) + " Invention", color: "#1e90ff"});
                    if (unlockable.needed.math > 0) text.push({text: (unlockable.progress > 0 || unlockable === active  ? (game.draw.toShortNumber(unlockable.current.math) + "/") : "") + game.draw.toShortNumber(unlockable.needed.math) + " Math", color: "#ffd700"});
                    if (unlockable.needed.physics > 0) text.push({text: (unlockable.progress > 0 || unlockable === active  ? (game.draw.toShortNumber(unlockable.current.physics) + "/") : "") + game.draw.toShortNumber(unlockable.needed.physics) + " Physics", color: "#48d1cc"});
                    if (unlockable.needed.chemistry) text.push({text: (unlockable.progress > 0 || unlockable === active  ? (game.draw.toShortNumber(unlockable.current.chemistry) + "/") : "") + game.draw.toShortNumber(unlockable.needed.chemistry) + " Chemistry", color: "#ff4500"});
                    if (unlockable.needed.biology) text.push({text: (unlockable.progress > 0 || unlockable === active  ? (game.draw.toShortNumber(unlockable.current.biology) + "/") : "") + game.draw.toShortNumber(unlockable.needed.biology) + " Biology", color: "#32cd32"});
                    if (unlockable.needed.quantum) text.push({text: (unlockable.progress > 0 || unlockable === active  ? (game.draw.toShortNumber(unlockable.current.quantum) + "/") : "") + game.draw.toShortNumber(unlockable.needed.quantum) + " Quantum", color: "#ff42ee"});
                }
            } else if (unlockable instanceof Trait) {
                let typeText = unlockable.type == "s" ? "Social" : unlockable.type == "c" ? "Cultural" : unlockable.type == "p" ? "Political" : "Religious";
                let typeColor = unlockable.type == "s" ? "#8a2be2" : unlockable.type == "c" ? "#adff2f" : unlockable.type == "p" ? "#ff7f50" : "#daa520";
                text.push({text: typeText + " Trait", color: typeColor});
                for (let desc of unlockable.desc) {
                    text.push({text: desc, color: "#ffffff"});
                }
                if (!unlockable.unlocked) {
                    let active = game.colony.traits.active;
                    text.push({text: (unlockable.progress > 0 || unlockable === active[unlockable.type]  ? (game.draw.toShortNumber(unlockable.current) + "/") : "") + game.draw.toShortNumber(unlockable.needed) + ` ${typeText} Development Points`, color: typeColor});
                }
            }
            return text;
        }
    }
}