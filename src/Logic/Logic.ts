import { network } from "../utils/const";
import { Event } from "../Event/Event";
import { EventType } from "../types/event.types";
export class Logic extends Event {
  constructor(
      public channel: number,
      public eventType: EventType,
      public note: number,
      public velocity: string
  ) {
    super(channel, eventType, note, velocity);
  }
}
