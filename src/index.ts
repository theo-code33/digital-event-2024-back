import Tempo from "./Tempo";
import Midi from "./Midi";
import Event from "./Event";
import MadMapper from "./MadMapper";
import Logic from "./Logic";
import Gameplay from "./Gameplay";
import resetAllVolumes from "./Logic/utils/ResetAllVolumes";
export { Tempo, Midi, Event, MadMapper, Logic, Gameplay };

export const currentTempo = new Tempo(120, 1000);
export const currentMidi = new Midi("midi", 120, 1000);
// currentMidi.listenLogicTempo(false);
// const initFunction = {
//     function: () => {console.log('init function')},
//     isAlreadyFired: false
// }
// currentMidi.listenLogicTempo(true, initFunction);
resetAllVolumes(
    0,
    [1, 2, 3, 4, 5, 6, 7, 8],
    "cc"
)
resetAllVolumes(
    1,
    [1, 2, 3, 4, 5, 6, 7, 8],
    "cc"
)
resetAllVolumes(
    2,
    [1, 2, 3, 4, 5, 6, 7, 8],
    "cc"
)