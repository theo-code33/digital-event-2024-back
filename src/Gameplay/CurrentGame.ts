import { Gameplay } from "./Gameplay";
import GameplayEvent from "./GameplayEvent";
import { MadMapper, currentMidi, currentTempo, devicePaths } from "../index";
import {
  introLenghtMS,
  firebaseCollectionGame,
  firebaseDocumentGame,
  gameLength,
} from "../utils/const";
import Logic from "../Logic";
import { firebaseService } from "../index";
export default class CurrentGame {
  public player1: any;
  public player2: any;
  private timeoutId: NodeJS.Timeout | undefined = undefined;

  startGame() {
      // currentMidi.networkOutput.send("cc", {
      //     controller: 1,
      //     value: 60,
      //     channel: 0
      // })
      firebaseService.updateDoc(`gameArray1`, "Debr9y1xeHlMyQO5AXoa", {
          gameArray: []
      })
      firebaseService.updateDoc(`gameArray2`, "gAYyJMbT6QP2djw3PXks", {
          gameArray: []
      })
    firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
      chronoStarted: true,
    });
    new MadMapper(13, "cc", 20, 127).sendMidi();
    setTimeout(() => {
      if (this.player1 === undefined && this.player2 === undefined) {
        this.player1 = new Gameplay(
          devicePaths[0].path,
          5,
          15,
          [31, 47, 79],
          this,
          1
        );
        this.player2 = new Gameplay(
          devicePaths[1].path,
          6,
          0,
          [1, 2, 4],
          this,
          2
        );

        this.player1.init();
        this.player2.init();
      } else {
        this.player1.combinationPlayer = this.player1.getInitialCombination();
        this.player2.combinationPlayer = this.player2.getInitialCombination();
      }

      firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
        winnerIs: "",
        status: "inGame",
        player1error: false,
        player2error: false,
        scorePlayer1: 0,
        scorePlayer2: 0,
      });

      firebaseService.updateDoc(`player1`, "UtKKY4MiDPxQgfzOZLnH", {
        combination: this.player1.combinationPlayer,
      });
      firebaseService.updateDoc(`player2`, "wp52souKXkyVkbJHA7M4", {
        combination: this.player2.combinationPlayer,
      });

      new Logic(currentTempo.getCurrentMusic(), "cc", 4, 0).sendMidi();
      new Logic(currentTempo.getCurrentMusic(), "cc", 5, 0).sendMidi();
      new Logic(currentTempo.getCurrentMusic(), "cc", 6, 0).sendMidi();
      new Logic(currentTempo.getCurrentMusic(), "cc", 7, 0).sendMidi();
      new Logic(currentTempo.getCurrentMusic(), "cc", 8, 0).sendMidi();
      new Logic(currentTempo.getCurrentMusic(), "cc", 9, 0).sendMidi();
      new Logic(currentTempo.getCurrentMusic(), "cc", 10, 0).sendMidi();
      new Logic(currentTempo.getCurrentMusic(), "cc", 7, 90).sendMidi();
      currentTempo.setCurrentMesure(-1);

      this.timeoutId = setTimeout(() => {
        this.stopGame();
      }, gameLength);

      console.log("Game started");
    }, introLenghtMS);
  }

  checkScore() {
    new GameplayEvent(this.player1.level, this.player2.level).sendEvent();
  }

  stopGame() {
      // set loop to waiting music
      // currentMidi.networkOutput.send("cc", {
      //     controller: 4,
      //     value: 116,
      //     channel: 0
      // })
      // Set bpm to 146
      // currentMidi.networkOutput.send("cc", {
      //     controller: 1,
      //     value: 73,
      //     channel: 0
      // })
      clearTimeout(this.timeoutId);
    clearTimeout(this.timeoutId);
    const winner =
      this.player1.level > this.player2.level ? "player1" : "player2";
    firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
      winnerIs: winner,
      chronoStarted: false,
      status: "endGame",
    });
    setTimeout(() => {
      firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
        status: "before",
      });
    }, 10000);
    // firebaseService.createDoc(firebaseCollectionLeaderboard, {
    //   number: {
    //     name: "",
    //     score: scoreplayer,
    //   },
    // })
    this.player1.level = 0;
    this.player2.level = 0;

    this.player1.combinationPlayer = [];
    this.player2.combinationPlayer = [];

    this.player1.gameArray = [];
    this.player2.gameArray = [];

    // currentTempo.setCurrentMusic(currentTempo.getCurrentMusic() + 1);

    currentTempo.increaseCurrentMesure(true);

    currentTempo.setCurrentMesure(-1);
    new MadMapper(13, "cc", 30, 127).sendMidi();
    console.log("Game stopped");
  }
}
