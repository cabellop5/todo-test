import { Service } from 'typedi'
import { TodoCreator } from '../../../domain/todo/services/create/todo.creator'
import { v4 } from 'uuid'
import { CreateTodoCommand } from './create-todo.command'
import { LabelByIdFinder } from '../../../domain/label/services/find/label-by-id.finder'
import { LabelNotFoundException } from '../../../domain/label/exceptions/label-not-found.exception'

@Service()
export class CreateTodoCommandHandler {
  constructor(
    private readonly todoCreator: TodoCreator,
    private readonly labelByIdFinder: LabelByIdFinder
  ) {}

  public async invoke(command: CreateTodoCommand): Promise<void> {
    const label = await this.labelByIdFinder.invoke(command.label)

    if (label === undefined) {
      throw new LabelNotFoundException(command.label)
    }

    await this.todoCreator.invoke(
      command.id || v4(),
      command.message,
      label,
      new Date(command.dueDate)
    )
  }
}
