import Gameplay from "./index";
import Midi from "../Midi";
import { bpm } from "../utils/let";

export default class GameplayEvent extends Midi{
    private readonly level: number;
    public bpm: number = bpm;
    constructor(level: number){
        super("midi", bpm)
        this.level = level
    }
    public sendEvent(): void {
       switch (this.level) {
           case 1:
                console.log("level 1")
                break
           case 2:
               console.log("level 2")
               break
           case 3:
               console.log("level 3")
               break
           default:
               break;
       }
    }
}