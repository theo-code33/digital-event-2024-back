import easymidi from "easymidi";
import {promises} from "node:dns";
import {clearInterval} from "node:timers";
import {currentTempo} from "../index";
import {gameLength} from "../utils/const";

export class Tempo {
  private intervalId: NodeJS.Timeout | null = null;
  public currentMesure: number = 1;
  public loopIndex: number = 0
  public moduloLoops: number = 0;
  public currentChan: number = 0;

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
    if (mesure === 13) {
        this.currentMesure = 1;
        currentTempo.setLoopIndex();
    } else {
        this.currentMesure = mesure;
    }
  }

  public getCurrentMesure(): number {
    return this.currentMesure;
  }

  public setLoopIndex(): void {
    this.loopIndex++
    switch (this.loopIndex) {
      case 2:
        this.currentChan += 1;
        break;
          case 4:
            this.currentChan++;
            break;
            case 6:
                this.currentChan++;
                break;
      default:
        break;
    }
  }

  public setModuloLoops(): void {
    this.moduloLoops = Math.floor(gameLength / this.loopLength)
    console.log("modulo loops: ",this.moduloLoops, "game length: ", gameLength, "loop index: ", this.loopIndex)
  }

  public getCurrentChan(): number {
    return this.currentChan;
  }
}
