import { EventType } from "../types/event.types";
import easymidi from "easymidi";
import { network, logicProInput } from "../utils/const";
export class Event {
  private output: easymidi.Output;

  constructor(
    public channel: number,
    public eventType: EventType,
    public note: number,
    public velocity: number
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
    // console.log(this.eventType, payload);
  }

  public sendMidiWithTransition(transition: number[]): void {
    const isEaseIn = transition[0] < transition[1];
    const delay = 3;
    const iterate = (i: number) => {
      setTimeout(() => {
        this.velocity = i;
        this.sendMidi();

        if (
          (isEaseIn && i < transition[1]) ||
          (!isEaseIn && i > transition[1])
        ) {
          iterate(isEaseIn ? i + 1 : i - 1);
        }
      }, delay);
    };

    iterate(transition[0]);
  }

  public init(): void {
    console.log("init");
  }
}
