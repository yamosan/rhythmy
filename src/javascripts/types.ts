import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../types/socketIO/events";

export type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
