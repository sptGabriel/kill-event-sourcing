import { AggregateRoot } from "aggregrate-root";
import { IEvent, IEventBus, IEventHandler } from "interfaces";
import { Type } from "utils/types";

export abstract class EventBus<Event extends IEvent = IEvent>
  implements IEventBus<Event> {

	abstract publish<T extends Event>(event: T): any
	abstract publishAll(events: Event[]): any
  abstract load(aggregateId: string): Promise<any>
  abstract loadByIds(aggregateIds: ReadonlyArray<string>): Promise<any>
  abstract allOf(aggregateType: Type<AggregateRoot>): Promise<any>

	}