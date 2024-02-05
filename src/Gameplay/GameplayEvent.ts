import Logic from "../Logic";
import {currentMidi, currentTempo} from "../index";
import {currentFirebase} from "../FirebaseService";
import {firebaseCollectionGame, firebaseDocumentGame} from "../utils/const";

export default class GameplayEvent{
    private readonly score1: number;
    private readonly score2: number;
    constructor(score1: number, score2: number){
        this.score1 = score1;
        this.score2 = score2;
    }
    public sendEvent(): void {
        currentFirebase.updateDoc(firebaseCollectionGame, firebaseDocumentGame, {
            "player1Domination": this.score1,
        })
        switch (this.score1 - this.score2) {
            case -3:
                currentMidi.tempoGateway(
                    {
                    function: () => {
                        this.resetAllVolumesToZero();
                        new Logic(currentTempo.getCurrentMusic(), "cc", 4, 90).sendMidi()
                    },
                    isAlreadyFired: false
                });
                break;
            case -2:
                currentMidi.tempoGateway(
                    {
                    function: () => {
                        this.resetAllVolumesToZero();
                        new Logic(currentTempo.getCurrentMusic(), "cc", 5, 90).sendMidi()
                    },
                    isAlreadyFired: false
                });
                break;
            case -1:
                currentMidi.tempoGateway(
                    {
                        function: () => {
                            this.resetAllVolumesToZero();
                            new Logic(currentTempo.getCurrentMusic(), "cc", 6, 90).sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 0:
                currentMidi.tempoGateway(
                    {
                        function: () => {
                            this.resetAllVolumesToZero();
                            new Logic(currentTempo.getCurrentMusic(), "cc", 7, 90).sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 1:
                currentMidi.tempoGateway(
                    {
                        function: () => {
                            this.resetAllVolumesToZero();
                            new Logic(currentTempo.getCurrentMusic(), "cc", 8, 90).sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 2:
                currentMidi.tempoGateway(
                    {
                        function: () => {
                            this.resetAllVolumesToZero();
                            new Logic(currentTempo.getCurrentMusic(), "cc", 9, 90).sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            case 3:
                currentMidi.tempoGateway(
                    {
                        function: () => {
                            this.resetAllVolumesToZero();
                            new Logic(currentTempo.getCurrentMusic(), "cc", 10, 90).sendMidi()
                        },
                        isAlreadyFired: false
                    });
                break;
            default:
                break;
        }
    }

    public resetAllVolumesToZero(): void {
        new Logic(currentTempo.getCurrentMusic(), "cc", 4, 0).sendMidi()
        new Logic(currentTempo.getCurrentMusic(), "cc", 5, 0).sendMidi()
        new Logic(currentTempo.getCurrentMusic(), "cc", 6, 0).sendMidi()
        new Logic(currentTempo.getCurrentMusic(), "cc", 7, 0).sendMidi()
        new Logic(currentTempo.getCurrentMusic(), "cc", 8, 0).sendMidi()
        new Logic(currentTempo.getCurrentMusic(), "cc", 9, 0).sendMidi()
        new Logic(currentTempo.getCurrentMusic(), "cc", 10, 0).sendMidi()
    }
}