import { Service } from 'typedi'
import { DeleteTodoCommand } from './delete-todo.command'
import { TodoByIdFinder } from '../../../domain/todo/services/find/todo-by-id.finder'
import { TodoNotFoundException } from '../../../domain/todo/exceptions/todo-not-found.exception'
import { TodoDelete } from '../../../domain/todo/services/delete/todo-delete'

@Service()
export class DeleteTodoCommandHandler {
  constructor(
    private readonly todoByIdFinder: TodoByIdFinder,
    private readonly todoDelete: TodoDelete
  ) {}

  public async invoke(command: DeleteTodoCommand): Promise<void> {
    const todo = await this.todoByIdFinder.invoke(command.id)

    if (todo === undefined) {
      throw new TodoNotFoundException(command.id)
    }

    await this.todoDelete.invoke(todo)
  }
}
