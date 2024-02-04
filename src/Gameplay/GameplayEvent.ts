import Logic from "../Logic";
import {currentMidi, currentTempo} from "../index";
import Event from "../Event";
import {network} from "../utils/const";
export default class GameplayEvent{
    private score1: number;
    private score2: number;
    constructor(score1: number, score2: number){
        this.score1 = score1;
        this.score2 = score2;
    }
    public sendEvent(): void {
        switch (this.score1 - this.score2) {
            case -3:
                currentMidi.listenLogicTempo(
                    true,
                    {
                    function: () => {
                        new Logic(currentTempo.getCurrentChan(), "cc", 1, 90).sendMidi()
                    },
                    isAlreadyFired: false
                });
                break;
            case -2:
                currentMidi.listenLogicTempo(
                    true,
                    {
                    function: () => {
                        new Logic(currentTempo.getCurrentChan(), "cc", 2, 90).sendMidi()
                    },
                    isAlreadyFired: false
                });
                break;
            case -1:
                currentMidi.listenLogicTempo(
                    true,
                    {
                        function: () => {
                            new Logic(currentTempo.getCurrentChan(), "cc", 3, 90).sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 0:
                currentMidi.listenLogicTempo(
                    true,
                    {
                        function: () => {
                            new Logic(currentTempo.getCurrentChan(), "cc", 4, 90).sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 1:
                currentMidi.listenLogicTempo(
                    true,
                    {
                        function: () => {
                            new Logic(currentTempo.getCurrentChan(), "cc", 5, 90).sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 2:
                currentMidi.listenLogicTempo(
                    true,
                    {
                        function: () => {
                            new Logic(currentTempo.getCurrentChan(), "cc", 6, 90).sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 3:
                currentMidi.listenLogicTempo(
                    true,
                    {
                        function: () => {
                            new Logic(currentTempo.getCurrentChan(), "cc", 7, 90).sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            default:
                break;
        }
    }
}