import { Inject, Service } from 'typedi'
import { TodoRepository } from '../../repository/todo.repository'
import { Label } from '../../../label/entities/label'
import { Todo } from '../../entities/todo'

@Service()
export class TodoUpdater {
  constructor(
    @Inject('TodoRepository')
    private readonly todoRepository: TodoRepository
  ) {}

  public async invoke(
    todo: Todo,
    label?: Label,
    message?: string,
    dueDate?: Date
  ): Promise<void> {
    if (label !== undefined) {
      todo.label = label
    }
    if (message !== undefined) {
      todo.message = message
    }
    if (dueDate !== undefined) {
      todo.dueDate = dueDate
    }
    await this.todoRepository.update(todo)
  }
}
