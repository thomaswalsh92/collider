import * as io from "socket.io-client";

export type OSCMessage =
  | "note1"
  | "note2"
  | "note3"
  | "note4"
  | "contour1"
  | "contour2"
  | "contour3"
  | "16th"
  | "bar"
  | "bpm";

export type UseOSC = (
  subscribeTo: OSCMessage | OSCMessage[],
  onMessage: (args?: any) => void
) => void;

const socket = io.connect("http://localhost:3001");
socket.connect();

export const useOSC: UseOSC = (subscribeTo, onMessage) => {
  if (Array.isArray(subscribeTo)) {
    for (let i = 0; i < subscribeTo.length; i++) {
      socket.on(subscribeTo[i], (args) => onMessage(args));
    }
    return;
  }

  socket.on(subscribeTo, (args) => onMessage(args));
};
