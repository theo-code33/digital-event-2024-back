import Tempo from "./Tempo";
import Midi from "./Midi";
import Event from "./Event";
import MadMapper from "./MadMapper";
import Logic from "./Logic";
import Gameplay from "./Gameplay";
import CurrentGame from "./Gameplay/CurrentGame";
import displayConnectedDevices from "./Gameplay/utils/DisplayConnectedDevices";
export { Tempo, Midi, Event, MadMapper, Logic, Gameplay };

export const currentTempo = new Tempo(120);
export const currentMidi = new Midi("midi", 120, 1000);
currentMidi.tempoGateway(false);
currentMidi.listenMidi()
const initFunction = {
    function: () => {console.log('init function')},
    isAlreadyFired: false
}
currentMidi.tempoGateway(true, initFunction);

export let currentGame = new CurrentGame();
export const devicePaths: any = displayConnectedDevices();

