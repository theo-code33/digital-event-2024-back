import * as HID from "node-hid";
import initialCombination from "./utils/InitialCombination";
import CurrentGame from "./CurrentGame";
import {firebaseCollectionGame, firebaseDocumentGame, gameLength} from "../utils/const";
import {firebaseService} from "../index";

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
  private isTimeout: boolean = false;
  constructor(
    path: string,
    deviceSlot: number,
    initialBtnValue: number,
    possibilityPlayer: number[],
    currentGame: CurrentGame,
    playerId: number
  ) {
    this.hidiDevice = new HID.HID(path);
    console.log("this.hidiDevice", this.hidiDevice)
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
    console.log(this.combinationPlayer, "this :", this);
    const documentId = this.playerId === 1 ? "UtKKY4MiDPxQgfzOZLnH" : "wp52souKXkyVkbJHA7M4";
    const gameArrayDoc = this.playerId === 1 ? "Debr9y1xeHlMyQO5AXoa" : "gAYyJMbT6QP2djw3PXks";

    this.hidiDevice.on("data", (data: number[]) => {
      const inputArray = Array.from(data);
      if (inputArray[this.deviceSlot] != this.initialBtnValue && !this.isClicking &&!this.isTimeout) {
        console.log(
          inputArray[this.deviceSlot],
          this.combinationPlayer,
          this.level,
            "isTimeout 3 :", this.isTimeout,
        );
        if (this.gameArray.length === 0) {
            firebaseService.updateDoc(`gameArray${this.playerId}`, gameArrayDoc, {
              gameArray: this.gameArray
            })
        } else {
          firebaseService.updateDoc(`gameArray${this.playerId}`, gameArrayDoc, {
            gameArray: this.gameArray
          })
        }

        console.log(`gameArray${this.playerId}`, gameArrayDoc)
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
        this.isTimeout = true;
        setTimeout(() => {
          this.isTimeout = false;
        }, this.combinationPlayer.length * 800);
        if (this.playerId === 1) {
          firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
            player1error: true
          })
          setTimeout(() => {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
              player1error: false
            })
          }, 1000);
        } else if (this.playerId === 2) {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
                player2error: true
            })
          setTimeout(() => {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
              player2error: false
            })
          }, 1000);
        }
        console.log("error !");
        return false;
      } else {
        if (this.playerId === 1) {
          firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
            player1error: false
          })
        } else if (this.playerId === 2) {
          firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
            player2error: false
          })
        }
        if (i === this.combinationPlayer.length - 1) {
          console.log("success !");
          if (this.playerId === 1) {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
              player1error: false,
              player1success: true
            })
            setTimeout(() => {
              firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
                player1success: false
              })
            }, 1000);
          } else if (this.playerId === 2) {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
              player2error: false,
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

          this.isTimeout = true;
          setTimeout(() => {
            this.isTimeout = false;
          }, this.combinationPlayer.length * 800);

          this.combinationPlayer.push(newPossibility);
          this.gameArray.length = 0;
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
