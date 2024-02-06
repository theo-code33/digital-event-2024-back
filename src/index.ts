import Tempo from "./Tempo";
import Midi from "./Midi";
import Event from "./Event";
import MadMapper from "./MadMapper";
import Logic from "./Logic";
import Gameplay from "./Gameplay";
import CurrentGame from "./Gameplay/CurrentGame";
import FirebaseService from "./FirebaseService";
import displayConnectedDevices from "./Gameplay/utils/DisplayConnectedDevices";
export { Tempo, Midi, Event, MadMapper, Logic, Gameplay, FirebaseService };

export const currentTempo = new Tempo(120);
export const currentMidi = new Midi("midi", 120, 1000);
export const firebaseService = new FirebaseService();
currentMidi.listenMidi();

export const devicePaths: any = displayConnectedDevices();
export let currentGame = new CurrentGame();

// new Logic(1, "cc", 4, 90).sendMidi()
// new Logic(1, "cc", 5, 90).sendMidi()
// new Logic(1, "cc", 6, 90).sendMidi()
// new Logic(1, "cc", 7, 90).sendMidi()
// new Logic(1, "cc", 8, 90).sendMidi()
// new Logic(1, "cc", 9, 90).sendMidi()
// new Logic(1, "cc", 10, 90).sendMidi()

new Logic(1, "cc", 4, 0).sendMidi()
new Logic(1, "cc", 5, 0).sendMidi()
new Logic(1, "cc", 6, 0).sendMidi()
new Logic(1, "cc", 7, 0).sendMidi()
new Logic(1, "cc", 8, 0).sendMidi()
new Logic(1, "cc", 9, 0).sendMidi()
new Logic(1, "cc", 10, 0).sendMidi()
