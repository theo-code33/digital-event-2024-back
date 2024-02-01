import Logic from "../Logic";
export default class GameplayEvent{
    private readonly level: number;
    constructor(level: number){
        this.level = level
    }
    public sendEvent(): void {
       switch (this.level) {
           case 1:
                new Logic(1, "noteon", "1", "1")
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