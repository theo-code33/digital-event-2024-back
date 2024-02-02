import Tempo from "./Tempo";
import Midi from "./Midi";
import Event from "./Event";
import MadMapper from "./MadMapper";
import Logic from "./Logic";
import Gameplay from "./Gameplay";
export { Tempo, Midi, Event, MadMapper, Logic, Gameplay };

export const currentTempo = new Tempo(120, 1000);
const midi = new Midi("midi", 120, 1000);
midi.listenLogicTempo(false);
const initFunction = {
    function: () => {console.log('init function')},
    isAlreadyFired: false
}
midi.listenLogicTempo(true, initFunction);