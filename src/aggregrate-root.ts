import { pascalCase } from 'change-case'
import { IEvent } from 'interfaces'

type IndexedWith<TTarget> = TTarget & { [key: string]: (event: Event) => void }

export abstract class AggregateRoot {
  protected aggregrateId: string
  private version: number
  readonly fetchVersion: number
  private newEvents: IEvent[]

  clearChanges(): void {
    this.newEvents = []
  }
  get changes(): IEvent[] {
    return this.newEvents;
  }

  private addEvent(event: IEvent): void {
    this.newEvents.push(event)
    this.version++
  }

  apply<T extends IEvent = IEvent>(event: T, isFromHistory = false) {
    const localFunctionName = resolveLocalFunctionName(event)
    const indexedThis = this as IndexedWith<this>
    const localFunction = indexedThis[localFunctionName] as {}
    if (typeof localFunction !== 'function') throw new Error(``)
    localFunction.call(this, event)
    this.addEvent(event)
  }

}

function resolveLocalFunctionName(event: IEvent): string {
  const namespace = event.$name
  const nameParts = namespace.split('/')
  const name = nameParts[nameParts.length - 1]
  const pascalName = pascalCase(name)
  return `when${pascalName}`
}
