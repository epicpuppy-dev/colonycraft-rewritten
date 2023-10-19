export interface Saveable {
    save (): string;
    load (data: string): void;
}