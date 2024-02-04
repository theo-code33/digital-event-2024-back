import Tempo from "../Tempo";
import easymidi from "easymidi";
import {network} from "../utils/const";
import {currentGame, currentTempo} from "../index";

export class Midi extends Tempo {
    public networkInput: easymidi.Input;
    private akai: easymidi.Input
  constructor(public midi: string, bpm: number, loopLength: number) {
    super(bpm);
    this.networkInput = new easymidi.Input(network, false);
    this.akai = new easymidi.Input("LPD8", false);
  }
  public tempoGateway(callbackFunction?: any): void {
      console.log('gateway is called')
    this.networkInput.on("noteon", (msg) => {
      console.log("gateway : note received", currentTempo.getCurrentMesure() % 8)
      if (
          msg.velocity === 112 &&
          currentTempo.getCurrentMesure() % 8 === 0 &&
          callbackFunction && !callbackFunction.isAlreadyFired &&
          msg.channel === 0 &&
          msg.note === 37
      ) {
        console.log("gateway is shipped !");
        callbackFunction.function();
        callbackFunction.isAlreadyFired = true;
      }
    });
  }

  public listenMidi(): void {
    this.akai.on("noteon", (msg) => {
      if (msg.note === 41 && msg.channel == 0) {
        currentGame.startGame();
      }
    });
    this.networkInput.on("noteon", (msg) => {
        if (msg.note === 37 && msg.channel == 0 && msg.velocity === 112) {
          currentTempo.increaseCurrentMesure();
          console.log("currentMesure", currentTempo.getCurrentMesure());
        }
    })
  }
}
