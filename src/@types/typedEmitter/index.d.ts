type Arguments<T> = [T] extends [(...args: infer U) => any]
  ? U
  : [T] extends [void] ? [] : [T]

interface DefaultEvent {
  connection(...args: any[]): void
  disconnect(...args: any[]): void
}

interface OverriddenMethods<EventRecord, EmitRecord> {
  on<E extends keyof EventRecord> (event: E, listener: EventRecord[E]): this
  emit<E extends keyof EmitRecord> (event: E, ...args: Arguments<EmitRecord[E]>): this | boolean
}

type OverriddenMethodsKey = keyof OverriddenMethods<any, any>

declare type TypedEmitter<Emitter, EventsRecord, EmitRecord=EventsRecord> =
  Omit<Emitter, OverriddenMethodsKey> & // Emitterから'on','emit'を削除
  OverriddenMethods<EventsRecord & DefaultEvent, EmitRecord>