import { ICommandHandler } from './command-handler.interface'
import { ICommand } from './command.interface'

export interface ICommandBus<CommandBase extends ICommand = ICommand> {
  execute<T extends CommandBase>(command: T): Promise<any>
  register(data:{commandHandler: ICommandHandler, command: ICommand}[]): void
}
