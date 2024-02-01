export class Tempo {
  constructor(public bpm: number) {}
  public getBpm(): number {
    return this.bpm;
  }
  public setBpm(bpm: number): void {
    this.bpm = bpm;
  }
}
