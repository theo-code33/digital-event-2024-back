import { EventType } from "../types/event.types";
import easymidi from "easymidi";
import { network } from "../utils/const";
export class Event {
  private output: easymidi.Output;

  constructor(
    public channel: number,
    public eventType: EventType,
    public note: string,
    public velocity: string
  ) {
    this.output = new easymidi.Output(network, false);
  }

  public sendMidi(): void {
    const payload =
      this.eventType === "cc"
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
    this.output.send(this.eventType as any, payload as any);
    console.log(this.eventType, payload);
  }

  public init(): void {
    console.log("init");
  }
}
