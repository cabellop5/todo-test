import { Todo } from '../entities/todo'

export interface TodoRepository {
  findById(id: string): Promise<Todo | undefined>
  findAll(): Promise<Todo[]>
  delete(todo: Todo): Promise<void>
  create(todo: Todo): Promise<void>
  update(todo: Todo): Promise<void>
}
