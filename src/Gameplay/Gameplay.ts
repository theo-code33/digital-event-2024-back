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
  public timeoutId: NodeJS.Timeout | null = null;
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
    console.log(this.combinationPlayer, "this :", this);
    const documentId = this.playerId === 1 ? "UtKKY4MiDPxQgfzOZLnH" : "wp52souKXkyVkbJHA7M4";
    let isClicking = false;
    this.hidiDevice.on("data", (data: number[]) => {
      const inputArray = Array.from(data);
      if (inputArray[this.deviceSlot] != this.initialBtnValue && !isClicking) {
        console.log(
          inputArray[this.deviceSlot],
          this.combinationPlayer,
          this.level
        );
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
        isClicking = true;
      } else if (
        inputArray[this.deviceSlot] == this.initialBtnValue &&
        isClicking
      ) {
        isClicking = false;
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
        if (this.playerId === 1) {
          firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
            player1error: true
          })
        } else if (this.playerId === 2) {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
                player2error: true
            })
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
              player1error: false
            })
          } else if (this.playerId === 2) {
            firebaseService.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
              player2error: false
            })
          }
          const newPossibility =
            this.possibilityPlayer[
              Math.floor(Math.random() * this.possibilityPlayer.length)
            ];
          this.combinationPlayer.push(newPossibility);
          this.gameArray.length = 0;
          return true;
        }
      }
    }
  }

  endGame(): void {
    this.timeoutId = setTimeout(() => {
      this.currentGame.stopGame(this.playerId, this.level);
    }, gameLength);
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
