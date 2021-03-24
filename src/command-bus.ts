import { ICommand, ICommandBus, ICommandHandler } from 'interfaces'
import { Type } from 'utils/types'

export class CommandBus<Command extends ICommand = ICommand>
  implements ICommandBus<Command> {
  private handlers = new Map<string, ICommandHandler<Command>>()

  public execute<T extends Command>(command: T): Promise<any> {
    const handler = this.handlers.get(command.constructor.name)
    if (!handler) throw new Error(``)
    return handler.execute(command)
  }

  public register(
    data: { commandHandler: ICommandHandler; command: Type<ICommand> }[],
  ): void {
    data.forEach(({command,commandHandler}) => {
			this.bind(commandHandler, command.name)
		})
  }

  private bind<T extends Command>(handler: ICommandHandler<T>, name: string) {
    this.handlers.set(name, handler)
  }
}
