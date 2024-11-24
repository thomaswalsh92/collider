import * as io from "socket.io-client";

// export type OSCAddress =
//   | "note1"
//   | "note2"
//   | "note3"
//   | "note4"
//   | "contour1"
//   | "contour2"
//   | "contour3";

// export type UseOSC = (
//   subscribeTo: OSCAddress | OSCAddress[],
//   onMessage: () => void
// ) => void;

const socket = io.connect("http://localhost:3001");
socket.connect();

export const useOSC = (subscribeTo, onMessage) => {
  if (Array.isArray(subscribeTo)) {
    for (let i = 0; i < subscribeTo.length; i++) {
      socket.on(subscribeTo[i], () => onMessage());
    }
    return;
  }

  socket.on(subscribeTo, () => onMessage());
};
