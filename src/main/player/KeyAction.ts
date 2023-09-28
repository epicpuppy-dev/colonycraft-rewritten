import { ColonyCraft } from "../ColonyCraft";
import { KeyBind } from "./KeyBind";

export class KeyAction {
    public id: string;
    public name: string;
    public bindings: KeyBind[] = [];
    public keydown: (game: ColonyCraft) => void;
    public keytick: (game: ColonyCraft) => void;
    public keyup: (game: ColonyCraft) => void;

    constructor(id: string, name: string, keydown: (game: ColonyCraft) => void, keytick: (game: ColonyCraft) => void = () => {}, keyup: (game: ColonyCraft) => void = () => {}) {
        this.id = id;
        this.name = name;
        this.keydown = keydown;
        this.keytick = keytick;
        this.keyup = keyup;
    }
}