import * as HID from 'node-hid';
import initialCombination from "./utils/InitialCombination";
import displayConnectedDevices from "./utils/DisplayConnectedDevices";


export class Gameplay {
  private hidiDevice: any
  private readonly deviceSlot: number
  private readonly initialBtnValue: number
  private gameArray: number[] = []
  private readonly possibilityPlayer: number[];
  private level: number = 1;
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

  public init() {
    console.log(this.combinationPlayer)
    let isClicking = false;
    this.hidiDevice.on("data", (data: number[]) => {
      const inputArray = Array.from(data);
      if (
          inputArray[this.deviceSlot] != this.initialBtnValue && !isClicking
      ) {
        this.gameArray.push(inputArray[this.deviceSlot]);
        const game: boolean | undefined = this.checkCombinationPlayer();
        game ? this.level++ : null;
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
        console.log("BEURRE !");
        return false;
      } else {
        if (i === this.combinationPlayer.length - 1) {
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
}

const devicePaths: any = displayConnectedDevices();

const device1 = new Gameplay(devicePaths[0].path, 5, 15, [31, 47, 79]);
const device2 = new Gameplay(devicePaths[1].path, 6, 0, [1, 2, 4]);
device1.init();
device2.init();