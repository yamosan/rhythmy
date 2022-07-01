export interface ServerToClientEvents {
  "monitor:start": (initialData: { notes: Binary[][] }) => void;
  "monitor:update": (data: { notes: Binary[][] }) => void;

  "player:start": (initialData: { notes: Binary[]; id: number }) => void;
}

export interface ClientToServerEvents {
  "player:update": (data: { track: Binary[] }) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
