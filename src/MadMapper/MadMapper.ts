import Event from "../Event";
import { EventType } from "../types/event.types";

export class MadMapper extends Event {
  constructor(
      public channel: number,
      public eventType: EventType,
      public note: number,
      public velocity: number
  ) {
    super(channel, eventType, note, velocity);
  }
}
