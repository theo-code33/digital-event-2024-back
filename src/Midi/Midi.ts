import Tempo from "../Tempo";
import easymidi from "easymidi";
import {introLenghtMS, logicProInput, network} from "../utils/const";
import {currentGame, currentMidi, currentTempo} from "../index";

export class Midi extends Tempo {
    public networkInput: easymidi.Input;
    public logicInput: easymidi.Input;
    private akai: easymidi.Input
  constructor(public midi: string, bpm: number, loopLength: number) {
    super(bpm);
    this.networkInput = new easymidi.Input(network, false);
    this.logicInput = new easymidi.Input(logicProInput, false);
    this.akai = new easymidi.Input("LPD8", false);
  }
  public tempoGateway(callbackFunction?: any): void {
    this.networkInput.on("noteon", (msg) => {
      if (
          msg.velocity === 112 &&
          currentTempo.getCurrentMesure() % 8 === 0 &&
          currentTempo.getCurrentMesure() !== 0 &&
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
        setTimeout(() => {
          currentMidi.tempoGateway({
            function: () => {
              currentGame.checkScore();
            },
            isAlreadyFired: false
          });
        }, introLenghtMS);
      }
    });
    this.logicInput.on("noteon", (msg) => {
        if (msg.note === 37 && msg.channel == 0 && msg.velocity === 112) {
          currentTempo.increaseCurrentMesure();
        }
    })
  }
}
