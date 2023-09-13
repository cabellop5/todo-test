import { Inject, Service } from 'typedi'
import { TodoRepository } from '../../repository/todo.repository'
import { Todo } from '../../entities/todo'

@Service()
export class TodoAllFinder {
  constructor(
    @Inject('TodoRepository')
    private readonly todoRepository: TodoRepository
  ) {}

  public invoke(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
