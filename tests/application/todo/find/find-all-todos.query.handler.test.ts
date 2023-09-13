import createMockInstance from 'jest-create-mock-instance'
import { CreateTodoCommandHandler } from '../../../../src/application/todo/create/create-todo.command.handler'
import { CreateTodoCommand } from '../../../../src/application/todo/create/create-todo.command'
import { LabelNotFoundException } from '../../../../src/domain/label/exceptions/label-not-found.exception'
import {TodoDelete} from "../../../../src/domain/todo/services/delete/todo-delete";
import {TodoByIdFinder} from "../../../../src/domain/todo/services/find/todo-by-id.finder";
import {TodoStub} from "../../../domain/todo/entities/todo-stub";
import {DeleteTodoCommandHandler} from "../../../../src/application/todo/delete/delete-todo.command.handler";
import {DeleteTodoCommand} from "../../../../src/application/todo/delete/delete-todo.command";
import {TodoNotFoundException} from "../../../../src/domain/todo/exceptions/todo-not-found.exception";
import {TodoAllFinder} from "../../../../src/domain/todo/services/find/todo-all.finder";
import {TodoDataTransformer} from "../../../../src/application/todo/shared/todo.data-transformer.service";
import {FindAllTodosQueryHandler} from "../../../../src/application/todo/find/find-all-todos.query.handler";
import {FindAllTodosQuery} from "../../../../src/application/todo/find/find-all-todos.query";
import {LabelResponse} from "../../../../src/application/label/shared/label.response";

describe('FindAll Todos Query Handler', () => {
  let todoAllFinder: jest.Mocked<TodoAllFinder>
  let todoDataTransformer: jest.Mocked<TodoDataTransformer>

  beforeEach(() => {
    todoAllFinder = createMockInstance(TodoAllFinder)
    todoDataTransformer = createMockInstance(TodoDataTransformer)
  })

  test('find all and call transformer', async () => {
    todoAllFinder.invoke.mockReturnValue(
      new Promise((resolve) => {
        resolve([TodoStub, TodoStub])
      })
    )
    const transformerResult = {
      id: '01',
      message: 'message',
      label: {id: '0001', name: 'name'},
      dueDate: '2013-09-08 15:15:15'
    }
    todoDataTransformer.invoke.mockReturnValue(
      transformerResult
    )
    const handler = new FindAllTodosQueryHandler(todoAllFinder, todoDataTransformer)
    const result = await handler.invoke(
      new FindAllTodosQuery()
    )
    expect(result).toEqual([transformerResult, transformerResult])
  })
})
