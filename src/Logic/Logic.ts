import { network } from "../utils/const";
import { Event } from "../Event/Event";
import { EventType } from "../types/event.types";
export class Logic extends Event {
  constructor(
      public channel: number,
      public eventType: EventType,
      public note: number,
      public velocity: number,
      public controllers?: number[],
  ) {
    super(channel, eventType, note, velocity);
  }
  setAllVolumes(transition?: number[]) {
    if (this.controllers && transition) {
      this.controllers.forEach((controller) => {
        new Event(this.channel, this.eventType, controller, this.velocity).sendMidiWithTransition(transition);
      })
    } else if (this.controllers && !transition) {
      this.controllers.forEach((controller) => {
        new Event(this.channel, this.eventType, controller, this.velocity).sendMidi();
      })
    }
  }
}
