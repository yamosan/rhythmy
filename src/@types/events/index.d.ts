declare namespace EventsRecord {
  // server -> client
  interface MonitorEventsFromServer {
    update: (data: { notes: number[][] }) => void
  }

  // client -> server
  interface MonitorEventsFromClient {
    
  }

  // server -> client
  interface PlayerEventsFromServer {
    
  }

  // client -> server
  interface PlayerEventsFromClient {
    update: (data: { track: number[] }) => void
  }
}