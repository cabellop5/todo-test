import { Service } from 'typedi'
import { FindByIdTodoQuery } from './find-by-id-todo.query'
import { TodoByIdFinder } from '../../../domain/todo/services/find/todo-by-id.finder'
import { TodoNotFoundException } from '../../../domain/todo/exceptions/todo-not-found.exception'
import { TodoDataTransformer } from '../shared/todo.data-transformer.service'
import { TodoResponse } from '../shared/todo.response'

@Service()
export class FindByIdTodoQueryHandler {
  constructor(
    private readonly todoByIdFinder: TodoByIdFinder,
    private readonly todoDataTransformer: TodoDataTransformer
  ) {}

  public async invoke(command: FindByIdTodoQuery): Promise<TodoResponse> {
    const todo = await this.todoByIdFinder.invoke(command.id)

    if (todo === undefined) {
      throw new TodoNotFoundException(command.id)
    }

    return this.todoDataTransformer.invoke(todo)
  }
}
