import { Service } from 'typedi'
import { Request, Response } from 'express'
import { DeleteTodoCommandHandler } from '../../../application/todo/delete/delete-todo.command.handler'
import { DeleteTodoCommand } from '../../../application/todo/delete/delete-todo.command'

@Service()
export class DeleteTodoController {
  constructor(
    private readonly deleteTodoCommandHandler: DeleteTodoCommandHandler
  ) {}
  public async invoke(req: Request, response: Response): Promise<void> {
    try {
      const command = new DeleteTodoCommand(req.params.id)
      await this.deleteTodoCommandHandler.invoke(command)
      response.status(200).send()
    } catch (error) {
      response.status(404).send(error.message)
    }
  }
}
