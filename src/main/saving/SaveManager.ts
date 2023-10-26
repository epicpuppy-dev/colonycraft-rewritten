import { version } from "../../version";
import { ColonyCraft } from "../ColonyCraft";
import { TickingEntity } from "../content/TickingEntity";
import { Saveable } from "./Saveable";

export class SaveManager extends TickingEntity {
    private saveables: {[path: string]: Saveable} = {};
    private static MAX_AUTOSAVES: number = 5;
    private autosave: number = 0;
    public storage: number;
    public toSave: string = "";
    public saves: {name: string, id: string, size: number, year: number, timestamp: string, version: string}[] = [];

    constructor (game: ColonyCraft) {
        super(game, 1000);
        this.storage = 0;
        const metadata = window.localStorage.getItem("_CCMeta");
        if (metadata == null) return;
        const data = JSON.parse(metadata);
        if (data.saves) this.saves = data.saves;
        if (data.storage) this.storage = data.storage;
    }

    public register (saveable: Saveable, path: string): void {
        this.saveables[path] = saveable;
    }
    
    public save (): string {
        let string = "CCSaveFormat-1.0";
        for (let saveable in this.saveables) {
            let add = this.saveables[saveable].save();
            if (add.length > 0) string += `/${saveable};${add}`;
        }
        return string;
    }

    public load (data: string) {
        let string = data.split("/");
        if (string[0] !== "CCSaveFormat-1.0") {
            alert("Invalid save format");
            throw new Error("Invalid save format");
        }
        for (let i = 1; i < string.length; i++) {
            let path = string[i].split(";")[0];
            let save = string[i].split(";")[1];
            if (this.saveables[path]) this.saveables[path].load(save);
        }
    }

    public newGame () {
        for (let saveable in this.saveables) {
            this.saveables[saveable].newGame();
        }
    }

    public tick(game: ColonyCraft): void {
        this.toSave = this.save();
        //autosave every 2 years
        if (game.clock.dayTotal % 240 == 0) {
            const overwrite = this.saves.find(item => item.id == "autosave" + this.autosave);
            if (overwrite) {
                this.storage -= overwrite.size;
                this.saves.splice(this.saves.indexOf(overwrite), 1);
            }
            let date = new Date();
            this.saves.push({name: "Autosave " + this.autosave, id: "autosave" + this.autosave, size: this.toSave.length * 2, year: game.clock.year, timestamp: date.toLocaleTimeString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'}), version: version});
            window.localStorage.setItem("autosave" + this.autosave, this.toSave);
            this.storage += this.toSave.length * 2;
            window.localStorage.setItem("_CCMeta", JSON.stringify({saves: this.saves, storage: this.storage}));
        } 
    }
}