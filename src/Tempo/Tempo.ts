import easymidi from "easymidi";
import {promises} from "node:dns";
import {clearInterval} from "node:timers";
import {currentTempo} from "../index";
import {gameLength} from "../utils/const";

export class Tempo {
  public currentMesure: number = 0;
  public moduloLoops: number = 0;
  public currentChan: number = 0;

  constructor(public bpm: number) {
  }

  public getBpm(): number {
    return this.bpm;
  }

  public setBpm(bpm: number): void {
    this.bpm = bpm;
  }

  public increaseCurrentMesure(setToZero?: boolean): void {
    this.currentMesure = setToZero ? 0 : this.currentMesure + 1;
  }

  public setCurrentMesure(mesure: number): void {
    this.currentMesure = mesure;
  }

  public getCurrentMesure(): number {
    return this.currentMesure;
  }
}
