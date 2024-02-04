import Tempo from "./Tempo";
import Midi from "./Midi";
import Event from "./Event";
import MadMapper from "./MadMapper";
import Logic from "./Logic";
import Gameplay from "./Gameplay";
export { Tempo, Midi, Event, MadMapper, Logic, Gameplay };

export const currentTempo = new Tempo(120, 1000);
export const currentMidi = new Midi("midi", 120, 1000);
currentMidi.listenLogicTempo(false);
const initFunction = {
    function: () => {console.log('init function')},
    isAlreadyFired: false
}
currentMidi.listenLogicTempo(true, initFunction);
// new Logic(0, "cc", 90, 0, [1, 2, 3, 4, 5, 6, 7, 8]).setAllVolumes([90, 0])
// new Logic(1, "cc", 90, 0, [1, 2, 3, 4, 5, 6, 7, 8]).setAllVolumes([90, 0])
// new Logic(2, "cc", 90, 0, [1, 2, 3, 4, 5, 6, 7, 8]).setAllVolumes([90, 0])
