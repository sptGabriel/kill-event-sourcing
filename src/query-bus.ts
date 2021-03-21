import { IQuery, IQueryBus, IQueryHandler } from 'interfaces'

export class QueryBus<Query extends IQuery = IQuery>
  implements IQueryBus<Query> {
  private handlers = new Map<string, IQueryHandler<Query>>()

  public execute<T extends Query>(query: T): Promise<any> {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) throw new Error(``);
    return handler.execute(query);
  }

  public register(
    data: { queryHandler: IQueryHandler; query: IQuery }[],
  ): void {
    data.forEach(({query,queryHandler}) => {
			this.bind(queryHandler, query.constructor.name)
		})
  }

  private bind<T extends Query>(handler: IQueryHandler<T>, name: string) {
    this.handlers.set(name, handler)
  }
}
