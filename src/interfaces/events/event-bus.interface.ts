import { IEventHandler } from './event.handler'
import { IEvent } from './event.interface'

export interface IEventBus<EventBase extends IEvent = IEvent> {
  publish<T extends EventBase>(event: T): any
  publishAll(events: EventBase[]): any
  register(eventHandler: IEventHandler, event: IEvent): void
}
