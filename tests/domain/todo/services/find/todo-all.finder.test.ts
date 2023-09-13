import {TodoRepositoryMock} from "../../repository/todo.repository.mock";
import {TodoStub} from "../../entities/todo-stub";
import {TodoAllFinder} from "../../../../../src/domain/todo/services/find/todo-all.finder";

describe('Todo All finder', () => {
  test('Todo All Finder return from repository', async () => {
    const repository = new TodoRepositoryMock()
    const todoAllFinder = new TodoAllFinder(repository)
    const result = await todoAllFinder.invoke()
    expect(result).toEqual([TodoStub, TodoStub])
  })
})
