import { Gameplay } from "./Gameplay";
import displayConnectedDevices from "./utils/DisplayConnectedDevices";
import GameplayEvent from "./GameplayEvent";
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
        this.totalScore = this.player1.level + this.player2.level
        this.player1Domination = Math.round((this.player1.level / this.totalScore) * 100)

        console.log(this.player1Domination)

        new GameplayEvent(this.player1Domination).sendEvent()
    }

    stopGame() {
        this.player1 = null
        this.player2 = null
    }
}