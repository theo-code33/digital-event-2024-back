import Tempo from "../Tempo";
import easymidi from "easymidi";
import {firebaseCollectionGame, firebaseDocumentGame, introLenghtMS, logicProInput, network} from "../utils/const";
import {currentGame, currentMidi, currentTempo, firebaseService} from "../index";

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
    this.logicInput.on("noteon", (msg) => {
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
      if (msg.note === 40 && msg.channel == 0) {
        currentGame.player1.currentGame.stopGame(currentGame.player1.playerId, currentGame.player1.level);
        currentGame.player2.endGame(currentGame.player2.playerId, currentGame.player2.level);
        firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
          status: "before",
        });
      }
    });
    this.logicInput.on("noteon", (msg) => {
        if (msg.note === 37 && msg.channel == 0 && msg.velocity === 112) {
          currentTempo.increaseCurrentMesure();
        }
    })
  }
}
