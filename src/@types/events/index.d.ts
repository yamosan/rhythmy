declare namespace EventsRecord {
  // server -> client
  interface MonitorEventsFromServer {
    start: (initialData: { notes: binary[][] }) => void
    update: (data: { notes: binary[][] }) => void
  }

  // client -> server
  interface MonitorEventsFromClient {
    
  }

  // server -> client
  interface PlayerEventsFromServer {
    start: (initialData: { notes: binary[], id: number }) => void
  }

  // client -> server
  interface PlayerEventsFromClient {
    update: (data: { track: binary[] }) => void
  }
}