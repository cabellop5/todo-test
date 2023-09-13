import { Label } from '../../../label/entities/label'
import { Inject, Service } from 'typedi'
import { TodoRepository } from '../../repository/todo.repository'
import { Todo } from '../../entities/todo'

@Service()
export class TodoCreator {
  constructor(
    @Inject('TodoRepository')
    private readonly todoRepository: TodoRepository
  ) {}

  public async invoke(
    id: string,
    message: string,
    label: Label,
    dueDate: Date
  ): Promise<void> {
    const todo: Todo = {
      id: id,
      message: message,
      label: label,
      dueDate: dueDate,
    }

    await this.todoRepository.create(todo)
  }
}
