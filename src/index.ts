import Tempo from "./Tempo";
import Midi from "./Midi";
import Event from "./Event";
import MadMapper from "./MadMapper";
import Logic from "./Logic";
import Gameplay from "./Gameplay";
export { Tempo, Midi, Event, MadMapper, Logic, Gameplay };

(() => {
  const e = new Event("1", "noteon", "1", "1").init();
  new Event("1", "noteon", "1", "1").sendMidi();
})();
