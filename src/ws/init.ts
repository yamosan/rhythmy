import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/socketIO/events";
import monitorHandler from "./monitorHandler";
import playerHandler from "./playerHandler";
import { Data } from "./types";

export function init(server: HttpServer, data: Data) {
  const io = new SocketServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server);

  playerHandler(io, data);
  monitorHandler(io, data);
}
