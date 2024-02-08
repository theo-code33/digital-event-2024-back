import * as HID from "node-hid";
import initialCombination from "./utils/InitialCombination";
import CurrentGame from "./CurrentGame";
import {firebaseCollectionGame, firebaseDocumentGame, gameLength} from "../utils/const";
import {firebaseService} from "../index";
import {clearInterval, clearTimeout} from "node:timers";

export class Gameplay {
  private hidiDevice: any;
  private readonly deviceSlot: number;
  private readonly initialBtnValue: number;
  public gameArray: number[] = [];
  private readonly possibilityPlayer: number[];
  public level: number = 1;
  public combinationPlayer: number[];
  public currentGame: CurrentGame;
  public playerId: number;
  private isClicking: boolean = false;
  private isTimeout1: boolean = false;
  private isTimeout2: boolean = false;
  private isTimeout1Id: NodeJS.Timeout | undefined;
  private isTimeout2Id: NodeJS.Timeout | undefined;
  private isErrorTimeoutId: NodeJS.Timeout | undefined;
  constructor(
    path: string,
    deviceSlot: number,
    initialBtnValue: number,
    possibilityPlayer: number[],
    currentGame: CurrentGame,
    playerId: number
  ) {
    this.hidiDevice = new HID.HID(path);
    this.deviceSlot = deviceSlot;
    this.initialBtnValue = initialBtnValue;
    this.possibilityPlayer = possibilityPlayer;
    this.combinationPlayer = this.getInitialCombination();
    this.currentGame = currentGame;
    this.playerId = playerId;
  }

  startGame(): void {
    throw new Error("Method not implemented.");
  }

  public init() {
    // console.log(this.combinationPlayer, "this :", this);
    const documentId = this.playerId === 1 ? "UtKKY4MiDPxQgfzOZLnH" : "wp52souKXkyVkbJHA7M4";
    const gameArrayDoc = this.playerId === 1 ? "Debr9y1xeHlMyQO5AXoa" : "gAYyJMbT6QP2djw3PXks";

    this.hidiDevice.on("data", (data: number[]) => {
      const inputArray = Array.from(data);
      if (
          inputArray[this.deviceSlot] != this.initialBtnValue &&
          this.isClicking === false &&
          this.isTimeout1 === false &&
          this.isTimeout2 === false) {
        // console.log(
        //   inputArray[this.deviceSlot],
        //   this.combinationPlayer,
        //   this.level,
        //     "isTimeout1", this.isTimeout1,
        //     "isTimeout2", this.isTimeout2
        // );
        console.log('player', this.playerId, 'clicked')
        if (this.gameArray.length === 0) {
            firebaseService.updateDoc(`gameArray${this.playerId}`, gameArrayDoc, {
              gameArray: this.gameArray
            })
        } else {
          firebaseService.updateDoc(`gameArray${this.playerId}`, gameArrayDoc, {
            gameArray: this.gameArray
          })
        }

        // console.log(`gameArray${this.playerId}`, gameArrayDoc)
        this.gameArray.push(inputArray[this.deviceSlot]);
        const isCombinationTrue: boolean | undefined =
          this.checkCombinationPlayer();
        if (isCombinationTrue) {
          this.level++;
          this.currentGame.checkScore();
          firebaseService.updateDoc(`player${this.playerId}`, documentId, {
            combination: this.combinationPlayer
          })
        }
        this.isClicking = true;
      } else if (
        inputArray[this.deviceSlot] == this.initialBtnValue &&
        this.isClicking
      ) {
        this.isClicking = false;
      }
    });
    this.hidiDevice.on("error", (error: Error) => {
      console.error("error:", error);
    });
  }

  private checkCombinationPlayer(): boolean | undefined {
    for (let i: number = 0; i < this.gameArray.length; i++) {
      if (this.gameArray[i] != this.combinationPlayer[i]) {
        this.gameArray.length = 0;
        this.isTimeout1 = true;
        // console.log("error timeout1 started !");
        this.isTimeout1Id = setTimeout(() => {
          this.isTimeout1 = false;
          clearTimeout(this.isTimeout1Id)
          // console.log("error timeout1 cleared !", this.combinationPlayer.length);
        }, this.combinationPlayer.length > 4 ? (this.combinationPlayer.length + 2) * 500 : (this.combinationPlayer.length + 2) * 800);
        if (this.playerId === 1) {
          firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
            player1error: true
          })
          this.isErrorTimeoutId = setTimeout(() => {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
              player1error: false
            })
            clearTimeout(this.isErrorTimeoutId)
          }, 1000);
        } else if (this.playerId === 2) {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
                player2error: true
            })
          this.isErrorTimeoutId = setTimeout(() => {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
              player2error: false
            })
            clearTimeout(this.isErrorTimeoutId)
          }, 1000);
        }
        // console.log("error !");
        return false;
      } else {
        if (i === this.combinationPlayer.length - 1) {
          this.isTimeout2 = true;
          // console.log("success !");
          if (this.playerId === 1) {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
              player1success: true
            })
            setTimeout(() => {
              firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
                player1success: false
              })
            }, 1000);
          } else if (this.playerId === 2) {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
              player2success: true
            })
            setTimeout(() => {
              firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
                player2success: false
              })
            }, 1000);
          }
          let newPossibility =
            this.possibilityPlayer[
              Math.floor(Math.random() * this.possibilityPlayer.length)
            ];

          while (newPossibility === this.combinationPlayer[this.combinationPlayer.length - 2]) {
            newPossibility =
              this.possibilityPlayer[
                Math.floor(Math.random() * this.possibilityPlayer.length)
              ];
          }

          this.combinationPlayer.push(newPossibility);
          this.gameArray.length = 0;
          console.log("error timeout2 started !");
          this.isTimeout2Id = setTimeout(() => {
            this.isTimeout2 = false;
            clearTimeout(this.isTimeout2Id)
            // console.log("error timeout2 cleared !");
          }, this.combinationPlayer.length > 4 ? (this.combinationPlayer.length + 2) * 500 : (this.combinationPlayer.length + 2) * 800);

          return true;
        }
      }
    }
  }
  getInitialCombination(): number[] {
    return initialCombination(this.possibilityPlayer);
  }

  setInitialCombination(): void {
    this.combinationPlayer = initialCombination(this.possibilityPlayer);
  }
}

// const device1 = new Gameplay(devicePaths[0].path, 5, 15, [31, 47, 79]);
// const device2 = new Gameplay(devicePaths[1].path, 6, 0, [1, 2, 4]);
// device1.init();
// device2.init();
