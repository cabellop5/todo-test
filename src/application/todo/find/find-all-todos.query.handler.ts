import { FindAllTodosQuery } from './find-all-todos.query'
import { TodoAllFinder } from '../../../domain/todo/services/find/todo-all.finder'
import { TodoResponse } from '../shared/todo.response'
import { TodoDataTransformer } from '../shared/todo.data-transformer.service'
import { Todo } from '../../../domain/todo/entities/todo'
import { Service } from 'typedi'

@Service()
export class FindAllTodosQueryHandler {
  constructor(
    private readonly todoAllFinder: TodoAllFinder,
    private readonly todoDataTransformer: TodoDataTransformer
  ) {}

  public async invoke(query: FindAllTodosQuery): Promise<TodoResponse[]> {
    const todos = await this.todoAllFinder.invoke()

    return todos.map((todo: Todo) => {
      return this.todoDataTransformer.invoke(todo)
    })
  }
}
