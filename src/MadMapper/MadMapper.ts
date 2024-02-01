import Event from "../Event";
import { EventType } from "../types/event.types";

export class MadMapper extends Event {
  constructor(
      public channel: number,
      public eventType: EventType,
      public note: string,
      public velocity: string
  ) {
    super(channel, eventType, note, velocity);
  }
}
