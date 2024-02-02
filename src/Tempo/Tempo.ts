import easymidi from "easymidi";
import {promises} from "node:dns";
import {clearInterval} from "node:timers";
import {currentTempo} from "../index";

export class Tempo {
  private intervalId: NodeJS.Timeout | null = null;
  public currentMesure: number = 1;

  constructor(public bpm: number, public loopLength: number) {
  }

  public getBpm(): number {
    return this.bpm;
  }

  public midiGateway(callback: () => void) {
    this.intervalId = setInterval(() => {
      callback();
      console.log(currentTempo.getLoopLength());
    }, currentTempo.getLoopLength());
  }

  public setBpm(bpm: number): void {
    this.bpm = bpm;
  }

  public setLoopLength(loopLength: number): void {
    this.loopLength = loopLength;
    clearInterval(this.intervalId as NodeJS.Timeout);
  }

  public getLoopLength(): number {
    return this.loopLength;
  }

  public setCurrentMesure(mesure: number): void {
    this.currentMesure = mesure == 16 ? 1 : mesure;
  }

  public getCurrentMesure(): number {
    return this.currentMesure;
  }
}
