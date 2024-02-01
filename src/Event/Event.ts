import { Event as EventType } from "../types/event.types";
import * as easymidi from "easymidi";
import { network } from "../utils/const";
export class Event {
  private output: easymidi.Output;

  constructor(
    public channel: string,
    public event: EventType,
    public note: string,
    public velocity: string
  ) {
    this.output = new easymidi.Output(network, false);
  }

  public sendMidi(): void {
    const payload =
      this.event === "cc"
        ? {
            controller: this.note,
            value: this.velocity,
            channel: this.channel,
          }
        : {
            note: this.note,
            velocity: this.velocity,
            channel: this.channel,
          };
    this.output.send(this.event as any, payload as any);
  }
}
