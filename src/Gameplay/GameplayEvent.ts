import Logic from "../Logic";
export default class GameplayEvent{
    private readonly player1Domination: number;
    constructor(player1Domination: number){
        this.player1Domination = player1Domination
    }
    public sendEvent(): void {
        switch (this.player1Domination) {
            case 0:

                break;
            case 10:

                break;
            case 20:

                break;
            case 30:

                break;
            case 40:

                break;
            case 50:

                break;
            case 60:

                break;
            case 70:

                break;
            case 80:

                break;
            case 90:

                break;
            case 100:

                break;
            default:
                break;
        }
    }
}