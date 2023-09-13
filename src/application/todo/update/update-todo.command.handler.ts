import { Service } from 'typedi'
import { UpdateTodoCommand } from './update-todo.command'
import { LabelByIdFinder } from '../../../domain/label/services/find/label-by-id.finder'
import { LabelNotFoundException } from '../../../domain/label/exceptions/label-not-found.exception'
import { TodoByIdFinder } from '../../../domain/todo/services/find/todo-by-id.finder'
import { TodoNotFoundException } from '../../../domain/todo/exceptions/todo-not-found.exception'
import { TodoUpdater } from '../../../domain/todo/services/update/todo.updater'

@Service()
export class UpdateTodoCommandHandler {
  constructor(
    private readonly todoByIdFinder: TodoByIdFinder,
    private readonly labelByIdFinder: LabelByIdFinder,
    private readonly todoUpdater: TodoUpdater
  ) {}

  public async invoke(command: UpdateTodoCommand): Promise<void> {
    const label = await this.labelByIdFinder.invoke(command.label)

    if (label === undefined) {
      throw new LabelNotFoundException(command.label)
    }

    const todo = await this.todoByIdFinder.invoke(command.id)

    if (todo === undefined) {
      throw new TodoNotFoundException(command.id)
    }

    await this.todoUpdater.invoke(
      todo,
      label,
      command.message,
      new Date(command.dueDate)
    )
  }
}
