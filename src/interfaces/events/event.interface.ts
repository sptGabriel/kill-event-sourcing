export interface IEvent {
  readonly $name: string
  readonly aggregrateVersion: number
  readonly aggregateId: string
}
