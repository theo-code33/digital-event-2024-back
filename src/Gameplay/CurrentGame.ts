import { Gameplay } from "./Gameplay";
import displayConnectedDevices from "./utils/DisplayConnectedDevices";
import GameplayEvent from "./GameplayEvent";
import {currentTempo} from "../index";
export default class CurrentGame {
    public player1: any;
    public player2: any;
    private totalScore: number = 0;
    public player1Domination: number = 50;

    startGame() {
        const devicePaths: any = displayConnectedDevices();
        this.player1 = new Gameplay(devicePaths[0].path, 5, 15, [31, 47, 79])
        this.player2 = new Gameplay(devicePaths[1].path, 6, 0, [1, 2, 4])

        this.player1.init();
        this.player2.init();
    }

    checkScore() {
        new GameplayEvent(this.player1.level, this.player2.level).sendEvent()
    }

    stopGame() {
        this.player1 = null
        this.player2 = null
    }
}