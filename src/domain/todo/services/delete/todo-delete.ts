import { Inject, Service } from 'typedi'
import { TodoRepository } from '../../repository/todo.repository'
import { Todo } from '../../entities/todo'

@Service()
export class TodoDelete {
  constructor(
    @Inject('TodoRepository')
    private readonly todoRepository: TodoRepository
  ) {}

  public invoke(todo: Todo): Promise<void> {
    return this.todoRepository.delete(todo)
  }
}
