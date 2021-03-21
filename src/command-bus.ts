import { ICommand, ICommandBus, ICommandHandler } from 'interfaces'

export class CommandBus<Command extends ICommand = ICommand>
  implements ICommandBus<Command> {
  private handlers = new Map<string, ICommandHandler<Command>>()

  public execute<T extends Command>(command: T): Promise<any> {
    const handler = this.handlers.get(command.constructor.name)
    if (!handler) throw new Error(``)
    return handler.execute(command)
  }

  public register(
    data: { commandHandler: ICommandHandler; command: ICommand }[],
  ): void {
    data.forEach(({command,commandHandler}) => {
			this.bind(commandHandler, command.constructor.name)
		})
  }

  private bind<T extends Command>(handler: ICommandHandler<T>, name: string) {
    this.handlers.set(name, handler)
  }

  //private getCommandName(command: Function): string {
  //  const { constructor } = Object.getPrototypeOf(command)
  //  return constructor.name as string
  //}
}
