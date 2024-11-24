//Gets values from any UPD emitting device and packages them up into events the client can subscribe to.
//Server does not interpret any data only creates appropriate address, sends and parses starts and end events for example from MIDI notes.

const osc = require("osc");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

//WEB SOCKET//
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allo,
  },
});

server.listen(3001, () => {
  console.log("Server running!");
});

//OSC Handler//
const getIPAddresses = () => {
  var os = require("os"),
    interfaces = os.networkInterfaces(),
    ipAddresses = [];

  for (var deviceName in interfaces) {
    var addresses = interfaces[deviceName];
    for (var i = 0; i < addresses.length; i++) {
      var addressInfo = addresses[i];
      if (addressInfo.family === "IPv4" && !addressInfo.internal) {
        ipAddresses.push(addressInfo.address);
      }
    }
  }

  return ipAddresses;
};

// Bind to a UDP socket to listen for incoming OSC events.
var udpPort = new osc.UDPPort({
  localAddress: "127.0.0.1",
  localPort: 2346,
});

udpPort.on("ready", () => {
  var ipAddresses = getIPAddresses();
  console.log("Listening for OSC over UDP.");
  ipAddresses.forEach(function (address) {
    console.log(" Host:", address + ", Port:", udpPort.options.localPort);
  });
});

udpPort.on("message", ({ address, args }) => {
  //@@@ NOTE MESSAGES @@@//
  //“Thump” - Kick / Central rhythmic anchor
  if (address === "/note1" && args[0] !== 0) {
    // console.log("note1");
    io.emit("note1", { velocity: args[0] });
  }

  //“Crack” - Snare / Clap / Backbeat element
  if (address === "/note2" && args[0] !== 0) {
    // console.log("note2");
    io.emit("note2", { velocity: args[0] });
  }

  //“Tick” - Hat / Shaker / Percussion
  if (address === "/note3" && args[0] !== 0) {
    // console.log("note3");
    io.emit("note3", { velocity: args[0] });
  }

  //“Womp” - Bass
  if (address === "/note4" && args[0] !== 0) {
    // console.log("note4");
    io.emit("note4", { velocity: args[0] });
  }

  //@@@ CONTOUR MESSAGES @@@//
  //“Swell” - A pad or reverbed element with some dynamism
  if (address === "/contour1") {
    // console.log("contour1: ", args[0]);
    io.emit("contour1", { value: args[0] });
  }

  //“Jitter” - A chaotic percussive or synth element
  if (address === "/contour2") {
    // console.log("contour2: ", args[0]);
    io.emit("contour2", { value: args[0] });
  }

  //“Loud” - Overall track contour
  if (address === "/contour3") {
    // console.log("contour3: ", args[0]);
    io.emit("contour3", { value: args[0] });
  }

  //@@@ TRACK MESSAGES @@@//
  // 16th notes elapsed
  if (address === "/16th") {
    // console.log("16th", args[0]);
    io.emit("BPM: ", { value: args[0] });
  }

  //Bars elapsed
  if (address === "/bar") {
    // console.log("bar", args[0]);
    io.emit("playing: ", { value: args[0] });
  }

  //BPM
  if (address === "/bpm") {
    // console.log("bpm", args[0]);
    io.emit("playing: ", { value: args[0] });
  }
});

udpPort.open();
