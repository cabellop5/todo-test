import { Inject, Service } from 'typedi'
import { TodoRepository } from '../../repository/todo.repository'
import { Todo } from '../../entities/todo'

@Service()
export class TodoByIdFinder {
  constructor(
    @Inject('TodoRepository')
    private readonly todoRepository: TodoRepository
  ) {}

  public invoke(id: string): Promise<Todo | undefined> {
    return this.todoRepository.findById(id)
  }
}
