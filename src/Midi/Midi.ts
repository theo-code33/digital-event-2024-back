import Tempo from "../Tempo";

export class Midi extends Tempo {
  constructor(public midi: string, bpm: string) {
    super(bpm);
  }
  public startFunction(): void {
    console.log("Midi startFunction");
  }
}
