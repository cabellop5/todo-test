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

describe('Delete Todo Command Handler', () => {
  let todoDelete: jest.Mocked<TodoDelete>
  let todoByIdFinder: jest.Mocked<TodoByIdFinder>

  beforeEach(() => {
    todoDelete = createMockInstance(TodoDelete)
    todoDelete.invoke.mockReturnValue(undefined)
    todoByIdFinder = createMockInstance(TodoByIdFinder)
  })

  test('create todo with all parameters', async () => {
    todoByIdFinder.invoke.mockReturnValue(
      new Promise((resolve) => {
        resolve(TodoStub)
      })
    )
    const handler = new DeleteTodoCommandHandler(todoByIdFinder, todoDelete)
    await handler.invoke(
      new DeleteTodoCommand('1234')
    )
    expect(await todoDelete.invoke).toBeCalledWith(TodoStub)
  })

  test('delete todo fails get todo', async () => {
    todoByIdFinder.invoke.mockReturnValue(
      new Promise((resolve) => {
        resolve(undefined)
      })
    )
    const handler = new DeleteTodoCommandHandler(todoByIdFinder, todoDelete)

    await expect(async () => {
      await handler.invoke(
        new DeleteTodoCommand('1234')
      )
    }).rejects.toThrow(TodoNotFoundException)
  })
})
