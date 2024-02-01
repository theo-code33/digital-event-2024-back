import easymidi from "easymidi";
import {promises} from "node:dns";

export class Tempo {
  constructor(public bpm: number, public loopLength: number) {}
  public getBpm(): number {
    return this.bpm;
  }

  public midiGateway(callback: () => void) {
    setInterval(() => {
      callback();
      console.log(this.loopLength)
    }, this.loopLength);
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
