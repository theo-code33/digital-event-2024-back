import Tempo from "../Tempo";
import easymidi from "easymidi";
import {network} from "../utils/const";
import {currentGame, currentTempo} from "../index";
import tempo from "../Tempo";
import Logic from "../Logic";
import CurrentGame from "../Gameplay/CurrentGame";

export class Midi extends Tempo {
    public input: easymidi.Input;
    private tempoNotesArray: number[] = [];
    private isAlreadyStarted: boolean = false;
    private isRestarting: boolean = false;
    private akai: easymidi.Input
  constructor(public midi: string, bpm: number, loopLength: number) {
    super(bpm);
    this.input = new easymidi.Input(network, false);
    this.akai = new easymidi.Input("LPD8", false);
  }
  public listenLogicTempo(isGateway: boolean, callbackFunction?: any): void {
    this.input.on("noteon", (msg) => {
      if (msg.velocity === 112 && isGateway && currentTempo.getCurrentMesure() === 1 && callbackFunction && !callbackFunction.isAlreadyFired) {
        callbackFunction.function();
        callbackFunction.isAlreadyFired = true;
      }
      if (msg.velocity === 112 && !this.isRestarting && !isGateway) {
        currentTempo.setCurrentMesure();
        this.tempoNotesArray.push(new Date().getTime());
        const lastNote = this.tempoNotesArray[this.tempoNotesArray.length - 1];
        const noteBeforeLastNote = this.tempoNotesArray[this.tempoNotesArray.length - 2];

        const deltaTime = lastNote - noteBeforeLastNote;

        if (this.tempoNotesArray.length == 2 && !this.isAlreadyStarted) {
          new Logic(0, "cc", 50, 10).sendMidi();
          console.log("restart !");
          this.isAlreadyStarted = true;
          this.isRestarting = true;
          setTimeout(() => {
            this.isRestarting = false;
            currentTempo.setCurrentMesure();
          }, deltaTime);
        }
      }
    });
  }

  public listenMidi(): void {
    this.akai.on("noteon", (msg) => {
      if (msg.note === 41 && msg.channel == 0) {
        currentGame.startGame();
      }
    });
  }
}
