import Logic from "../Logic";
import { MadMapper, currentMidi, currentTempo } from "../index";
import { firebaseService } from "../index";
import { firebaseCollectionGame, firebaseDocumentGame } from "../utils/const";

export default class GameplayEvent {
  public readonly score1: number;
  public readonly score2: number;
  constructor(score1: number, score2: number) {
    this.score1 = score1;
    this.score2 = score2;
  }
  public sendEvent(): void {
    firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
      scorePlayer1: this.score1,
      scorePlayer2: this.score2,
    });
    console.log("send event method called");
    switch (this.score1 - this.score2) {
      case -3:
        currentMidi.tempoGateway({
          function: () => {
            this.resetAllVolumesToZero();
            console.log("player 1 score:", this.score1);
            new Logic(currentTempo.getCurrentMusic(), "cc", 4, 90).sendMidi();
            new MadMapper(currentTempo.getCurrentPhase(), "cc", 80, 127).sendMidi();
          },
          isAlreadyFired: false,
        });
        break;
      case -2:
        currentMidi.tempoGateway({
          function: () => {
            this.resetAllVolumesToZero();
            console.log("player 1 score:", this.score1);
            new Logic(currentTempo.getCurrentMusic(), "cc", 5, 90).sendMidi();
            new MadMapper(currentTempo.getCurrentPhase(), "cc", 70, 127).sendMidi();
          },
          isAlreadyFired: false,
        });
        break;
      case -1:
        currentMidi.tempoGateway({
          function: () => {
            this.resetAllVolumesToZero();
            console.log("player 1 score:", this.score1);
            new Logic(currentTempo.getCurrentMusic(), "cc", 6, 90).sendMidi();
            new MadMapper(currentTempo.getCurrentPhase(), "cc", 60, 127).sendMidi();
          },
          isAlreadyFired: false,
        });
        break;
      case 0:
        currentMidi.tempoGateway({
          function: () => {
            this.resetAllVolumesToZero();
            console.log("player 1 score:", this.score1);
            new Logic(currentTempo.getCurrentMusic(), "cc", 7, 90).sendMidi();
            new MadMapper(currentTempo.getCurrentPhase(), "cc", 50, 127).sendMidi();
          },
          isAlreadyFired: false,
        });
        break;
      case 1:
        currentMidi.tempoGateway({
          function: () => {
            this.resetAllVolumesToZero();
            console.log("player 1 score:", this.score1);
            new Logic(currentTempo.getCurrentMusic(), "cc", 8, 90).sendMidi();
            new MadMapper(currentTempo.getCurrentPhase(), "cc", 40, 127).sendMidi();
          },
          isAlreadyFired: false,
        });
        break;
      case 2:
        currentMidi.tempoGateway({
          function: () => {
            this.resetAllVolumesToZero();
            console.log("player 1 score:", this.score1);
            new Logic(currentTempo.getCurrentMusic(), "cc", 9, 90).sendMidi();
            new MadMapper(currentTempo.getCurrentPhase(), "cc", 30, 127).sendMidi();
          },
          isAlreadyFired: false,
        });
        break;
      case 3:
        currentMidi.tempoGateway({
          function: () => {
            this.resetAllVolumesToZero();
            console.log("player 1 score:", this.score1);
            new Logic(currentTempo.getCurrentMusic(), "cc", 10, 90).sendMidi();
            new MadMapper(currentTempo.getCurrentPhase(), "cc", 20, 127).sendMidi();
          },
          isAlreadyFired: false,
        });
        break;
      default:
        break;
    }
  }

  public resetAllVolumesToZero(): void {
    new Logic(currentTempo.getCurrentMusic(), "cc", 4, 0).sendMidi();
    new Logic(currentTempo.getCurrentMusic(), "cc", 5, 0).sendMidi();
    new Logic(currentTempo.getCurrentMusic(), "cc", 6, 0).sendMidi();
    new Logic(currentTempo.getCurrentMusic(), "cc", 7, 0).sendMidi();
    new Logic(currentTempo.getCurrentMusic(), "cc", 8, 0).sendMidi();
    new Logic(currentTempo.getCurrentMusic(), "cc", 9, 0).sendMidi();
    new Logic(currentTempo.getCurrentMusic(), "cc", 10, 0).sendMidi();
  }
}
