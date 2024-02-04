import {Logic} from "../Logic";
import {EventType} from "../../types/event.types";

const resetAllVolumes = (channel: number, controllers: number[], eventType: EventType) => {
    controllers.forEach((controller) => {
        new Logic(channel, eventType, controller, "0").sendMidi();
    })
}

export default resetAllVolumes;