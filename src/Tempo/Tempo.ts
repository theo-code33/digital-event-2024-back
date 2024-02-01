import easymidi from "easymidi";

export class Tempo {
  constructor(public bpm: number, public loopLength: number) {}
  public getBpm(): number {
    return this.bpm;
  }

  public midiGateway(): void {
    console.log()
  }
  public setBpm(bpm: number): void {
    this.bpm = bpm;
  }

  public setLoopLength(loopLength: number): void {
    this.loopLength = loopLength;
  }

  public getLoopLength(): number {
    return this.loopLength;
  }
}
