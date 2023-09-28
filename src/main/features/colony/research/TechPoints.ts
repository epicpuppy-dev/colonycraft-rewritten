export class TechPoints {
    public invention: number;
    public math: number;
    public physics: number;
    public chemistry: number;
    public biology: number;
    public quantum: number;

    constructor (invention: number = 0, math: number = 0, physics: number = 0, chemistry: number = 0, biology: number = 0, quantum: number = 0) {
        this.invention = invention;
        this.math = math;
        this.physics = physics;
        this.chemistry = chemistry;
        this.biology = biology;
        this.quantum = quantum;
    }
}