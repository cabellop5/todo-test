import {Todo} from "../../../../src/domain/todo/entities/todo";
import {TodoRepository} from "../../../../src/domain/todo/repository/todo.repository";
import {TodoStub} from "../entities/todo-stub";

export class TodoRepositoryMock implements TodoRepository {
  private mockSave = jest.fn()

  create(todo: Todo): Promise<void> {
    return this.mockSave(todo)
  }

  assertLastSavedIs(expected: Todo): void {
    const mock = this.mockSave.mock
    const lastSaved = mock.calls[mock.calls.length - 1][0] as Todo
    expect(lastSaved.id).toEqual(expected.id)
  }

  delete(todo: Todo): Promise<void> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<Todo[]> {
    return Promise.resolve([TodoStub, TodoStub]);
  }

  findById(id: string): Promise<Todo | undefined> {
    return Promise.resolve(undefined);
  }

  update(todo: Todo): Promise<void> {
    return Promise.resolve(undefined);
  }
}
