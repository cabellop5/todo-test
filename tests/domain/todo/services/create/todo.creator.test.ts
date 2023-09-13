import {TodoCreator} from "../../../../../src/domain/todo/services/create/todo.creator";
import {TodoRepositoryMock} from "../../repository/todo.repository.mock";
import {TodoStub} from "../../entities/todo-stub";

describe('Todo Creator', () => {

  test('Todo creator call creator', async () => {
    const repository = new TodoRepositoryMock()
    const todoCreator = new TodoCreator(repository)
    await todoCreator.invoke(TodoStub.id, TodoStub.message, TodoStub.label, TodoStub.dueDate)
    repository.assertLastSavedIs(TodoStub)
  })

})
