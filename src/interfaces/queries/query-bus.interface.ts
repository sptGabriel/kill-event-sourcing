import { IQueryHandler } from './query-handler.interface'
import { IQuery } from './query.interface'

export interface IQueryBus<QueryBase extends IQuery = IQuery> {
  execute<T extends QueryBase = QueryBase,TRes = any>(query: T): Promise<TRes>
  register(data: { queryHandler: IQueryHandler; query: IQuery }[]): void
}
