import { Gameplay } from "./Gameplay";
import GameplayEvent from "./GameplayEvent";
import {devicePaths} from "../index";
export default class CurrentGame {
    public player1: any;
    public player2: any;

    startGame() {
        if (this.player1 === undefined && this.player2 === undefined) {
            this.player1 = new Gameplay(devicePaths[0].path, 5, 15, [31, 47, 79], this)
            this.player2 = new Gameplay(devicePaths[1].path, 6, 0, [1, 2, 4], this)
        } else {
            this.player1.combinationPlayer = this.player1.getInitialCombination()
            this.player2.combinationPlayer = this.player2.getInitialCombination()
        }
        this.player1.init();
        this.player2.init();

        console.log("Game started");
    }

    checkScore() {
        new GameplayEvent(this.player1.level, this.player2.level).sendEvent()
    }

    stopGame() {
        this.player1.level = 0
        this.player2.level = 0

        this.player1.combinationPlayer = []
        this.player2.combinationPlayer = []

        console.log("Game stopped");
    }
}