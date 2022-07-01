import express from "express";
import { createServer } from "http";
import path from "path";
import { init as connectSocketServer } from "./ws/init";
import { Notes } from "./ws/models/Notes";
import { Player, Players } from "./ws/models/Players";

// TODO: 別ファイル化
function initData() {
  const playerLimit = 7;
  const nSteps = 12;
  const data = {
    players: new Players(playerLimit),
    notes: new Notes(playerLimit, nSteps),
  };

  const player = new Player(3, "default");
  data.players.setPlayer(player);
  data.notes.replaceTrack(player.id, [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]);

  return data;
}

const app = express();
const http = createServer(app);
connectSocketServer(http, initData());

app.use(express.static(path.join(__dirname, "builds")));

// monitor
app.get("/monitor", (req, res) => {
  res.sendFile(path.resolve(__dirname, "views/monitor.html"));
});

// player
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "views/player.html"));
});
app.get("*", (req, res) => {
  res.redirect("/");
});

export default http;
