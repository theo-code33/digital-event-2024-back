import Tempo from "../Tempo";
import easymidi from "easymidi";
import {
  firebaseCollectionGame,
  firebaseDocumentGame,
  introLenghtMS,
  logicProInput,
  network,
} from "../utils/const";
import {
  MadMapper,
  currentGame,
  currentMidi,
  currentTempo,
  firebaseService,
} from "../index";

export class Midi extends Tempo {
  public networkInput: easymidi.Input;
  public logicInput: easymidi.Input;
  private akai: easymidi.Input;
  public networkOutput: easymidi.Output = new easymidi.Output(network, false);
  private noteonListeners: Map<Function, any> = new Map();
  constructor(public midi: string, bpm: number, loopLength: number) {
    super(bpm);
    this.networkInput = new easymidi.Input(network, false);
    this.logicInput = new easymidi.Input(logicProInput, false);
    this.akai = new easymidi.Input("LPD8", false);
  }
  public tempoGateway(callbackFunction: any): void {
    const listener = (msg: easymidi.Note) => {
      if (
          msg.velocity === 112 &&
          currentTempo.getCurrentMesure() % 8 === 0 &&
          currentTempo.getCurrentMesure() !== 0 &&
          callbackFunction &&
          !callbackFunction.isAlreadyFired &&
          msg.channel === 0 &&
          msg.note === 37
      ) {
        console.log("gateway is shipped !");
        callbackFunction.function();
        callbackFunction.isAlreadyFired = true;
      }
    };

    this.logicInput.on("noteon", listener);
    this.noteonListeners.set(callbackFunction, listener);

    if (this.noteonListeners.size > 10) {
      const oldestListener = this.noteonListeners.values().next().value;
      this.logicInput.removeListener("noteon", oldestListener);
      this.noteonListeners.delete(oldestListener);
    }
  }

  public removeTempoGatewayListener(callbackFunction: any): void {
    const listener = this.noteonListeners.get(callbackFunction);
    if (listener) {
      this.logicInput.removeListener("noteon", listener);
      this.noteonListeners.delete(callbackFunction);
    }
  }

  public listenMidi(): void {
    this.akai.on("noteon", (msg: easymidi.Note) => {
      if (msg.note === 41 && msg.channel == 0) {
        currentGame.startGame();
        setTimeout(() => {
          currentMidi.tempoGateway({
            function: () => {
              currentGame.checkScore();
            },
            isAlreadyFired: false,
          });
        }, introLenghtMS);
      }
      if (msg.note === 40 && msg.channel == 0) {
        currentGame.stopGame();
        firebaseService.updateDoc(
          firebaseCollectionGame,
          firebaseDocumentGame,
          {
            status: "before",
          }
        );
      }
      if (msg.note === 42 && msg.channel == 0) {
        console.log()
        // set loop to player entrance
        // this.networkOutput.send("cc", {
        //   controller: 4,
        //   value: 116,
        //   channel: 0
        // })
      }
        this.networkOutput.send("cc", {
          controller: 4,
          value: 116,
          channel: 0,
        });
      new MadMapper(13, "cc", 10, 127).sendMidi();
    });
    this.logicInput.on("noteon", (msg) => {
      if (msg.note === 37 && msg.channel == 0 && msg.velocity === 112) {
        currentTempo.increaseCurrentMesure();
      }
    });
  }
}
