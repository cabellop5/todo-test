import { Service } from 'typedi'
import { Todo } from '../../../domain/todo/entities/todo'
import { TodoResponse } from './todo.response'

@Service()
export class TodoDataTransformer {
  invoke(todo: Todo): TodoResponse {
    return {
      id: todo.id,
      message: todo.message,
      label: {
        id: todo.label.id,
        name: todo.label.name,
      },
      dueDate: todo.dueDate.toISOString(),
    }
  }
}
