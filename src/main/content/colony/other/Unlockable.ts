export abstract class Unlockable {
    public abstract unlocked: boolean;
    public abstract type: string;
    public abstract prereqs: string[];
}