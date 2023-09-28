import { game } from "../..";
import { ColonyCraft } from "../ColonyCraft";
import { KeyAction } from "../player/KeyAction";
import { KeyBind } from "../player/KeyBind";

export class KeyController {
    public actions: {[key: string]: KeyAction};
    public bindings: KeyBind[];

    constructor() {
        this.actions = {};
        this.bindings = [];

        document.addEventListener('keydown', (event) => this.keydown(event));
        document.addEventListener('keyup', (event) => this.keyup(event));
    }

    private keydown(event: KeyboardEvent): void {
        //loop through all bindings
        for (const binding of this.bindings) if (binding.code === event.code) {
            binding.keyheld = true;
            //loop through all actions of the binding
            for (const action of binding.actions) {
                //call the action's keydown function
                action.keydown(game);
            }
        }
    }

    public keyup(event: KeyboardEvent): void {
        //loop through all bindings
        for (const binding of this.bindings) if (binding.code === event.code) {
            binding.keyheld = false;
            //loop through all actions of the binding
            for (const action of binding.actions) {
                //call the action's keyup function
                action.keyup(game);
            }
        }
    }

    public tick(game: ColonyCraft): void {
        //loop through all bindings
        for (const binding of this.bindings) if (binding.keyheld) {
            //loop through all actions of the binding
            for (const action of binding.actions) {
                //call the action's keytick function
                action.keytick(game);
            }
        }
    }

    public addAction(action: KeyAction): KeyController {
        this.actions[action.id] = action;
        return this;
    }

    public addBinding(binding: KeyBind): KeyController {
        this.bindings.push(binding);
        for (const action of binding.actions) action.bindings.push(binding);
        return this;
    }
}