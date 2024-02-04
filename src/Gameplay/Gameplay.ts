import * as HID from 'node-hid';
import initialCombination from "./utils/InitialCombination";
import GameplayEvent from "./GameplayEvent";
import CurrentGame from "./CurrentGame";
import {gameLength} from "../utils/const";

let currentGame: any;
export class Gameplay {
  private hidiDevice: any
  private readonly deviceSlot: number
  private readonly initialBtnValue: number
  private gameArray: number[] = []
  private readonly possibilityPlayer: number[];
  public level: number = 1;
  private readonly combinationPlayer: number[]
  constructor(
      path: string, deviceSlot: number, initialBtnValue: number, possibilityPlayer: number[]
  ) {
    this.hidiDevice = new HID.HID(path);
    this.deviceSlot = deviceSlot;
    this.initialBtnValue = initialBtnValue;
    this.possibilityPlayer = possibilityPlayer;
    this.combinationPlayer = initialCombination(this.possibilityPlayer);
  }

  startGame(): void {
    throw new Error('Method not implemented.');
  }

  public init() {
    console.log(this.combinationPlayer)
    this.endGame()
    let isClicking = false;
    this.hidiDevice.on("data", (data: number[]) => {
      const inputArray = Array.from(data);
      if (
          inputArray[this.deviceSlot] != this.initialBtnValue && !isClicking
      ) {
        console.log(inputArray[this.deviceSlot], this.combinationPlayer, this.level);
        this.gameArray.push(inputArray[this.deviceSlot]);
        const isCombinationTrue: boolean | undefined = this.checkCombinationPlayer();
        if (isCombinationTrue) this.level++ && currentGame.checkScore();
        isClicking = true;
      }

      else if (
          inputArray[this.deviceSlot] == this.initialBtnValue && isClicking
      ) {
        isClicking = false;
      }
    });
    this.hidiDevice.on("error", (error: Error) => {
      console.error("error:", error);
    });
  }

  private checkCombinationPlayer() {
    for (let i: number = 0; i < this.gameArray.length; i++) {
      if (this.gameArray[i] != this.combinationPlayer[i]) {
        this.gameArray.length = 0;
        console.log("error !");
        return false;
      } else {
        if (i === this.combinationPlayer.length - 1) {
          console.log("success !")
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
    setTimeout(() => {
      currentGame.stopGame();
    }, gameLength);
  }
}

// const device1 = new Gameplay(devicePaths[0].path, 5, 15, [31, 47, 79]);
// const device2 = new Gameplay(devicePaths[1].path, 6, 0, [1, 2, 4]);
// device1.init();
// device2.init();
// currentGame = new CurrentGame();
// currentGame.startGame();