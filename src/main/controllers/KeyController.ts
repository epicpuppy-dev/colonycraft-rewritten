import { ColonyCraft } from "../ColonyCraft";
import { KeyAction } from "../player/KeyAction";
import { KeyBind } from "../player/KeyBind";

export class KeyController {
    public actions: {[key: string]: KeyAction};
    public bindings: {[key: string]: KeyBind};
    public rebind: KeyBind | null = null;

    constructor(game: ColonyCraft) {
        this.actions = {};
        this.bindings = {};

        document.addEventListener('keydown', (event) => this.keydown(event, game));
        document.addEventListener('keyup', (event) => this.keyup(event, game));
    }

    private keydown(event: KeyboardEvent, game: ColonyCraft): void {
        if (this.rebind !== null) {
            this.rebind.code = event.code;
            let key = event.code.replace(/(Key|Digit|Arrow)/g, "");
            //hard coded key names
            switch (key) {
                case "ShiftLeft": key = "Left Shift"; break;
                case "ShiftRight": key = "Right Shift"; break;
                case "ControlLeft": key = "Left Ctrl"; break;
                case "ControlRight": key = "Right Ctrl"; break;
                case "AltLeft": key = "Left Alt"; break;
                case "AltRight": key = "Right Alt"; break;
                case "BracketLeft": key = "["; break;
                case "BracketRight": key = "]"; break;
                case "Semicolon": key = ";"; break;
                case "Quote": key = "'"; break;
                case "Comma": key = ","; break;
                case "Period": key = "."; break;
                case "Slash": key = "/"; break;
                case "Equal": key = "="; break;
                case "Minus": key = "-"; break;
            }
            this.rebind.key = key;
            this.rebind = null;

            //save keybinds
            let keybinds: {[key: string]: {code: string, key: string}} = {};
            for (const binding in this.bindings) {
                keybinds[binding] = {
                    code: this.bindings[binding].code,
                    key: this.bindings[binding].key
                };
            }
            localStorage.setItem("keybinds", JSON.stringify(keybinds));
            return;
        }
        //loop through all bindings
        let prevScreens = game.currentScreens.slice();
        for (const binding in this.bindings) if (this.bindings[binding].code === event.code) {
            this.bindings[binding].keyheld = true;
            //loop through all actions of the binding
            for (const action of this.bindings[binding].actions) {
                //call the action's keydown function
                action.keydown(game, prevScreens);
            }
        }
    }

    public keyup(event: KeyboardEvent, game: ColonyCraft): void {
        //loop through all bindings
        let prevScreens = game.currentScreens.slice();
        for (const binding in this.bindings) if (this.bindings[binding].code === event.code) {
            this.bindings[binding].keyheld = false;
            //loop through all actions of the binding
            for (const action of this.bindings[binding].actions) {
                //call the action's keyup function
                action.keyup(game, prevScreens);
            }
        }
    }

    public tick(game: ColonyCraft): void {
        //loop through all bindings
        let prevScreens = game.currentScreens.slice();
        for (const binding in this.bindings) if (this.bindings[binding].keyheld) {
            //loop through all actions of the binding
            for (const action of this.bindings[binding].actions) {
                //call the action's keytick function
                action.keytick(game, prevScreens);
            }
        }
    }

    public addAction(action: KeyAction): KeyController {
        this.actions[action.id] = action;
        return this;
    }

    public addBinding(binding: KeyBind): KeyController {
        this.bindings[binding.id] = binding;
        for (const action of binding.actions) action.bindings.push(binding);
        return this;
    }
}