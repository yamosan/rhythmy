import { TypedSocketServer, TypedSocket, Data } from "./types";

const playerHandler = (io: TypedSocketServer, models: Data) => {
  const nsp = io.of("/player");
  nsp.on("connection", (sock) => {
    console.log(`player[${sock.id}] connected`);
    setup(sock, models);
    onUpdate(sock, models);
    onDisconnect(sock, models);
  });
};

function setup(sock: TypedSocket, models: Data) {
  const { players, notes } = models;
  if (players.setNewPlayer(sock.id)) {
    try {
      const id = players.findPlayer(sock.id).id;
      sock.emit("player:start", { notes: notes.data[id], id: id });
    } catch (err) {
      console.log(err);
    }
  } else {
    // TODO: 満員のとき
  }
}

function onUpdate(sock: TypedSocket, models: Data) {
  const { players, notes } = models;
  sock.on("player:update", (data: { track: Binary[] }) => {
    try {
      const id = players.findPlayer(sock.id).id;
      notes.replaceTrack(id, data.track);
      console.log("LOG: notes is updated");
    } catch (err) {
      console.log(err);
    }
  });
}

function onDisconnect(sock: TypedSocket, models: Data) {
  const { players, notes } = models;
  sock.on("disconnect", () => {
    console.log(`player[${sock.id}] disconnected`);
    try {
      const id = players.deletePlayer(sock.id).id;
      notes.resetTrack(id);
    } catch (err) {
      console.log(err);
    }
  });
}

export default playerHandler;
