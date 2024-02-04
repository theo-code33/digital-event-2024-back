import Logic from "../Logic";
import {currentMidi, currentTempo} from "../index";

export default class GameplayEvent{
    private readonly score1: number;
    private readonly score2: number;
    constructor(score1: number, score2: number){
        this.score1 = score1;
        this.score2 = score2;
    }
    public sendEvent(): void {
        switch (this.score1 - this.score2) {
            case -3:
                currentMidi.tempoGateway(
                    true,
                    {
                    function: () => {
                        this.resetAllVolumesToZero();
                        // new Logic(currentTempo.getCurrentChan(), "cc", 1, 90).sendMidiWithTransition([0, 90])
                    },
                    isAlreadyFired: false
                });
                break;
            case -2:
                currentMidi.tempoGateway(
                    true,
                    {
                    function: () => {
                        this.resetAllVolumesToZero();
                        // new Logic(currentTempo.getCurrentChan(), "cc", 2, 90).sendMidiWithTransition([0, 90])
                    },
                    isAlreadyFired: false
                });
                break;
            case -1:
                currentMidi.tempoGateway(
                    true,
                    {
                        function: () => {
                            this.resetAllVolumesToZero();
                            // new Logic(currentTempo.getCurrentChan(), "cc", 3, 90).sendMidiWithTransition([0, 90])
                        },
                        isAlreadyFired: false
                    });
                break;
            case 0:
                currentMidi.tempoGateway(
                    true,
                    {
                        function: () => {
                            this.resetAllVolumesToZero();
                            // new Logic(currentTempo.getCurrentChan(), "cc", 4, 90).sendMidiWithTransition([0, 90])
                        },
                        isAlreadyFired: false
                    });
                break;
            case 1:
                currentMidi.tempoGateway(
                    true,
                    {
                        function: () => {
                            this.resetAllVolumesToZero();
                            // new Logic(currentTempo.getCurrentChan(), "cc", 5, 90).sendMidiWithTransition([0, 90])
                        },
                        isAlreadyFired: false
                    });
                break;
            case 2:
                currentMidi.tempoGateway(
                    true,
                    {
                        function: () => {
                            this.resetAllVolumesToZero();
                            // new Logic(currentTempo.getCurrentChan(), "cc", 6, 90).sendMidiWithTransition([0, 90])
                        },
                        isAlreadyFired: false
                    });
                break;
            case 3:
                currentMidi.tempoGateway(
                    true,
                    {
                        function: () => {
                            this.resetAllVolumesToZero();
                            // new Logic(currentTempo.getCurrentChan(), "cc", 7, 90).sendMidiWithTransition([0, 90])
                        },
                        isAlreadyFired: false
                    });
                break;
            default:
                break;
        }
    }

    public resetAllVolumesToZero(): void {

    }
}