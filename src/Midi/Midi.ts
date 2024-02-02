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
  public listenLogicTempo(): void {
    this.input.on("noteon", (msg) => {
      if (msg.velocity === 112 && !this.isRestarting) {
        this.tempoNotesArray.push(new Date().getTime());
        const lastNote = this.tempoNotesArray[this.tempoNotesArray.length - 1];
        const noteBeforeLastNote = this.tempoNotesArray[this.tempoNotesArray.length - 2];

        const deltaTime = lastNote - noteBeforeLastNote;

        currentTempo.setBpm(60000 / deltaTime * 4);
        currentTempo.setLoopLength(deltaTime * 15);

        if (this.tempoNotesArray.length == 2 && !this.isAlreadyStarted) {
          new Logic(0, "cc", "4", "9").sendMidi();
          console.log("restart !")
          this.isAlreadyStarted = true;
          this.isRestarting = true;
          setTimeout(() => {
            this.isRestarting = false;
          }, deltaTime * 2);
        }

        console.log(currentTempo.getBpm(), currentTempo.getLoopLength());
      }
    });
  }
}
