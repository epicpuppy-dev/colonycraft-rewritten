export interface Saveable {
    save (): string;
    load (data: string): void;
    newGame (): void;
}

/*
    public save (): string {
        return ``;
    }

    public load (data: string) {
        let split = data.split("-");
    }
*/