import { KeyAction } from "./KeyAction";

export class KeyBind {
    public id: string;
    public name: string;
    public key: string;
    public code: string;
    public keyheld: boolean = false;
    public actions: KeyAction[];
    public category: string | null;

    constructor(id: string, name: string, key: string, code: string, category: string | null, actions: KeyAction[]) {
        this.id = id;
        this.name = name;
        this.key = key;
        this.code = code;
        this.actions = actions;
        this.category = category;
    }
}