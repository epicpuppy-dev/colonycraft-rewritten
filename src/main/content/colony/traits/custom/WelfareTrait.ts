import { ColonyCraft } from "../../../../ColonyCraft";
import { WelfareModifier } from "../../welfare/WelfareModifier";
import { Trait } from "../Trait";

export class WelfareTrait extends Trait implements WelfareModifier {
    private morale: number;
    private health: number;
    
    constructor (game: ColonyCraft, id: string, name: string, type: "s"|"c"|"p"|"r", needed: number, health: number, morale: number, desc: string[] = [], prereqs: string[] = []) {
        super(game, id, name, type, needed, desc, prereqs);
        this.morale = morale;
        this.health = health;

        game.colony.welfare.addWelfareModifier(this);
    }

    public getMorale (): number {
        return this.unlocked ? this.morale : 0;
    }

    public getHealth (): number {
        return this.unlocked ? this.health : 0;
    }
}