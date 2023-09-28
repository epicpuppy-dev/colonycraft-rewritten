import { KeyAction } from "./KeyAction";

export class KeyBind {
    public name: string;
    public key: string;
    public code: string;
    public keyheld: boolean = false;
    public actions: KeyAction[];

    constructor(name: string, key: string, code: string, actions: KeyAction[]) {
        this.name = name;
        this.key = key;
        this.code = code;
        this.actions = actions;
    }
}