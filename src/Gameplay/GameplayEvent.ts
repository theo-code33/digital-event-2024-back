import Logic from "../Logic";
import {currentMidi} from "../index";
import Event from "../Event";
import {network} from "../utils/const";
export default class GameplayEvent{
    private readonly player1Domination: number;
    constructor(player1Domination: number){
        this.player1Domination = player1Domination
    }
    public sendEvent(): void {
        switch (this.player1Domination) {
            case 0:
                currentMidi.listenLogicTempo(
                    true,
                    {
                    function: () => {
                        new Logic(0, "cc", "8", "90").sendMidi()
                    },
                    isAlreadyFired: false
                });
                break;
            case 17:
                currentMidi.listenLogicTempo(
                    true,
                    {
                    function: () => {
                        new Logic(0, "cc", "3", "90").sendMidi()
                    },
                    isAlreadyFired: false
                });
                break;
            case 33:
                currentMidi.listenLogicTempo(
                    true,
                    {
                        function: () => {
                            new Logic(0, "cc", "7", "90").sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 50:
                currentMidi.listenLogicTempo(
                    true,
                    {
                        function: () => {
                            new Logic(0, "cc", "2", "90").sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 66:
                currentMidi.listenLogicTempo(
                    true,
                    {
                        function: () => {
                            new Logic(0, "cc", "6", "90").sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 83:
                currentMidi.listenLogicTempo(
                    true,
                    {
                        function: () => {
                            new Logic(0, "cc", "5", "90").sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 100:
                currentMidi.listenLogicTempo(
                    true,
                    {
                        function: () => {
                            new Logic(0, "cc", "5", "90").sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            default:
                break;
        }
    }
}