import {
  TCPClient,
  EventFactory,
  TCPConfig,
  TCPWriteEventOptions,
} from 'geteventstore-promise'
import { IEvent } from 'interfaces'

interface IEventPub {
  streamName: string
  eventType: string
  data: Omit<IEvent, '$name'>
  metaData?: object
  options?: TCPWriteEventOptions
}

/**
 * @class EventStore
 * @description EventStore.org
 */
export class EventStoreClient {
  [x: string]: any
  private client: TCPClient
  /**
   * @constructor
   */
  constructor(private readonly config: TCPConfig) {
    this.type = 'event-store'
    this.eventFactory = new EventFactory()
    this.connect()
  }

  connect() {
    this.client = new TCPClient(this.config)
    return this
  }

  getClient() {
    return this.client
  }

  //async publish(event: IEventPub) {
  //  return await this.client.writeEvent(
  //    event.streamName,
  //    event.eventType,
  //    event.data,
  //    event.metaData,
  //    event.options,
  //  )
  //}

  newEvent(name: any, payload: any) {
    return this.eventFactory.newEvent(name, payload)
  }

  close() {
    this.client.close()
    return this
  }
}
