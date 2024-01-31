export class Tempo {
  constructor(public bpm: string) {}
  public getBpm(): string {
    return this.bpm;
  }
  public setBpm(bpm: string): void {
    this.bpm = bpm;
  }
}
