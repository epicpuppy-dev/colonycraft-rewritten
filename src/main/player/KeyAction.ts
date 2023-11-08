import { ColonyCraft } from "../ColonyCraft";
import { KeyBind } from "./KeyBind";

export class KeyAction {
    public id: string;
    public name: string;
    public bindings: KeyBind[] = [];
    public keydown: (game: ColonyCraft, prevScreens: string[]) => void;
    public keytick: (game: ColonyCraft, prevScreens: string[]) => void;
    public keyup: (game: ColonyCraft, prevScreens: string[]) => void;

    constructor(id: string, name: string, keydown: (game: ColonyCraft, prevScreens: string[]) => void, keytick: (game: ColonyCraft, prevScreens: string[]) => void = () => {}, keyup: (game: ColonyCraft, prevScreens: string[]) => void = () => {}) {
        this.id = id;
        this.name = name;
        this.keydown = keydown;
        this.keytick = keytick;
        this.keyup = keyup;
    }
}