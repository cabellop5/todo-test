import { TodoCreator } from '../../../../src/domain/todo/services/create/todo.creator'
import { LabelByIdFinder } from '../../../../src/domain/label/services/find/label-by-id.finder'
import createMockInstance from 'jest-create-mock-instance'
import { LabelStub } from '../../../domain/label/entities/label-stub'
import { CreateTodoCommandHandler } from '../../../../src/application/todo/create/create-todo.command.handler'
import { CreateTodoCommand } from '../../../../src/application/todo/create/create-todo.command'
import { LabelNotFoundException } from '../../../../src/domain/label/exceptions/label-not-found.exception'

describe('Create Todo Command Handler', () => {
  let todoCreator: jest.Mocked<TodoCreator>
  let labelByIdFinder: jest.Mocked<LabelByIdFinder>

  beforeEach(() => {
    todoCreator = createMockInstance(TodoCreator)
    todoCreator.invoke.mockReturnValue(undefined)
    labelByIdFinder = createMockInstance(LabelByIdFinder)
  })

  test('create todo with all parameters', async () => {
    labelByIdFinder.invoke.mockReturnValue(
      new Promise((resolve) => {
        resolve(LabelStub)
      })
    )
    const handler = new CreateTodoCommandHandler(todoCreator, labelByIdFinder)
    await handler.invoke(
      new CreateTodoCommand('1234', 'message', '0001', '2013-09-08 08:08:08')
    )
    expect(await todoCreator.invoke).toBeCalledWith(
      '1234',
      'message',
      LabelStub,
      new Date('2013-09-08 08:08:08')
    )
  })

  test('create todo without id parameters', async () => {
    labelByIdFinder.invoke.mockReturnValue(
      new Promise((resolve) => {
        resolve(LabelStub)
      })
    )
    const handler = new CreateTodoCommandHandler(todoCreator, labelByIdFinder)
    await handler.invoke(
      new CreateTodoCommand(undefined, 'message', '0001', '2013-09-08 08:08:08')
    )
    expect(await todoCreator.invoke).toBeCalledWith(
      expect.any(String),
      'message',
      LabelStub,
      new Date('2013-09-08 08:08:08')
    )
  })

  test('create todo fails get label', async () => {
    labelByIdFinder.invoke.mockReturnValue(
      new Promise((resolve) => {
        resolve(undefined)
      })
    )
    const handler = new CreateTodoCommandHandler(todoCreator, labelByIdFinder)

    await expect(async () => {
      await handler.invoke(
        new CreateTodoCommand('1234', 'message', '0001', '2013-09-08 08:08:08')
      )
    }).rejects.toThrow(LabelNotFoundException)
  })
})
