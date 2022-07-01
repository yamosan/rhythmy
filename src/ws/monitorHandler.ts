import { Data, TypedSocket, TypedSocketServer } from "./types";

const monitorHandler = (io: TypedSocketServer, data: Data) => {
  const { players, notes } = data;
  const nsp = io.of("/monitor");
  // notesに更新がかかるたびにemit
  notes.setObserver(() => {
    nsp.emit("monitor:update", { notes: notes.data });
    console.log("emit to monitor");
  });

  nsp.on("connection", (sock: TypedSocket) => {
    console.log(`monitor[${sock.id}] connected`);
    nsp.emit("monitor:start", { notes: notes.data });
    sock.on("disconnect", () => {
      console.log(`monitor[${sock.id}] disconnected`);
    });
  });
};

export default monitorHandler;
