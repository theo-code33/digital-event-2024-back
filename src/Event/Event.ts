import { Event as EventType } from "../types/event.types";
export class Event {
  constructor(
    public channel: string,
    public event: EventType,
    public note: string,
    public velocity: string
  ) {}

  public sendMidi(): void {
    console.log(this.channel, this.event, this.note, this.velocity);
    console.log("Event sendMidi");
  }
}
