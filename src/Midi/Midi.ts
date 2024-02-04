import Tempo from "../Tempo";
import easymidi from "easymidi";
import {network} from "../utils/const";
import {currentTempo} from "../index";
import tempo from "../Tempo";
import Logic from "../Logic";

export class Midi extends Tempo {
    public input: easymidi.Input;
    private tempoNotesArray: number[] = [];
    private isAlreadyStarted: boolean = false;
    private isRestarting: boolean = false;
  constructor(public midi: string, bpm: number, loopLength: number) {
    super(bpm, loopLength);
    this.input = new easymidi.Input(network, false);
  }
  public listenLogicTempo(isGateway: boolean, callbackFunction?: any): void {
    this.input.on("noteon", (msg) => {
      if (msg.velocity === 112 && isGateway && currentTempo.getCurrentMesure() === 1 && callbackFunction && !callbackFunction.isAlreadyFired) {
        callbackFunction.function();
        callbackFunction.isAlreadyFired = true;
      }
      if (msg.velocity === 112 && !this.isRestarting && !isGateway) {
        currentTempo.setCurrentMesure(currentTempo.getCurrentMesure() + 1);
        this.tempoNotesArray.push(new Date().getTime());
        const lastNote = this.tempoNotesArray[this.tempoNotesArray.length - 1];
        const noteBeforeLastNote = this.tempoNotesArray[this.tempoNotesArray.length - 2];

        const deltaTime = lastNote - noteBeforeLastNote;

        console.log("current loop length:", currentTempo.getLoopLength(), 'current bpm:', currentTempo.getBpm(), "current mesure:", currentTempo.getCurrentMesure());

        if (this.tempoNotesArray.length == 2 && !this.isAlreadyStarted) {
          new Logic(0, "cc", 50, 10).sendMidi();
          console.log("restart !");
          this.isAlreadyStarted = true;
          this.isRestarting = true;
          setTimeout(() => {
            this.isRestarting = false;
            currentTempo.setBpm(60000 / deltaTime * 4);
            currentTempo.setLoopLength(deltaTime * 15);
            currentTempo.setModuloLoops();
            currentTempo.setCurrentMesure(1);
          }, deltaTime);
        }
      }
    });
  }
}
