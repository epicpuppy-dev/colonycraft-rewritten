import { ColonyCraft } from "../ColonyCraft";
import { KeyAction } from "../player/KeyAction";
import { KeyBind } from "../player/KeyBind";

export class KeyController {
    public actions: {[key: string]: KeyAction};
    public bindings: KeyBind[];

    constructor(game: ColonyCraft) {
        this.actions = {};
        this.bindings = [];

        document.addEventListener('keydown', (event) => this.keydown(event, game));
        document.addEventListener('keyup', (event) => this.keyup(event, game));
    }

    private keydown(event: KeyboardEvent, game: ColonyCraft): void {
        //loop through all bindings
        let prevScreens = game.currentScreens.slice();
        for (const binding of this.bindings) if (binding.code === event.code) {
            binding.keyheld = true;
            //loop through all actions of the binding
            for (const action of binding.actions) {
                //call the action's keydown function
                action.keydown(game, prevScreens);
            }
        }
    }

    public keyup(event: KeyboardEvent, game: ColonyCraft): void {
        //loop through all bindings
        let prevScreens = game.currentScreens.slice();
        for (const binding of this.bindings) if (binding.code === event.code) {
            binding.keyheld = false;
            //loop through all actions of the binding
            for (const action of binding.actions) {
                //call the action's keyup function
                action.keyup(game, prevScreens);
            }
        }
    }

    public tick(game: ColonyCraft): void {
        //loop through all bindings
        let prevScreens = game.currentScreens.slice();
        for (const binding of this.bindings) if (binding.keyheld) {
            //loop through all actions of the binding
            for (const action of binding.actions) {
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
        this.bindings.push(binding);
        for (const action of binding.actions) action.bindings.push(binding);
        return this;
    }
}