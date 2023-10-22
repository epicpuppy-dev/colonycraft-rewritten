import { Saveable } from "./Saveable";

export class SaveManager {
    private saveables: {[path: string]: Saveable} = {};
    public storage: number;
    public toSave: string = "";
    public saves: {name: string, id: string, size: number, year: number, timestamp: string}[] = [];

    constructor () {
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
}