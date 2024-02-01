import Tempo from "../Tempo";
import easymidi from "easymidi";
import {network} from "../utils/const";
import {currentTempo} from "../index";
import tempo from "../Tempo";

export class Midi extends Tempo {
    public input: easymidi.Input;
    private tempoNotesArray: number[] = [];
  constructor(public midi: string, bpm: number, loopLength: number) {
    super(bpm, loopLength);
    this.input = new easymidi.Input(network, false);
  }
  public listenMidi(): void {
    this.input.on("noteon", (msg) => {
      if (msg.velocity === 112) {
        this.tempoNotesArray.push(new Date().getTime());
        const lastNote = this.tempoNotesArray[this.tempoNotesArray.length - 1];
        const noteBeforeLastNote = this.tempoNotesArray[this.tempoNotesArray.length - 2];

        const deltaTime = lastNote - noteBeforeLastNote;

        currentTempo.setBpm(60000 / deltaTime * 4);
        currentTempo.setLoopLength(deltaTime * 16);

        console.log(currentTempo.getBpm(), currentTempo.getLoopLength());
      }
    });
  }
}
