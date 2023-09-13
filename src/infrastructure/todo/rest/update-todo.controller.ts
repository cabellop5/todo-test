import { Service } from 'typedi'
import { Request, Response } from 'express'
import { UpdateTodoCommandHandler } from '../../../application/todo/update/update-todo.command.handler'
import { UpdateTodoCommand } from '../../../application/todo/update/update-todo.command'

@Service()
export class UpdateTodoController {
  constructor(
    private readonly updateTodoCommandHandler: UpdateTodoCommandHandler
  ) {}

  public async invoke(req: Request, response: Response): Promise<void> {
    try {
      const command = new UpdateTodoCommand(
        req.body.id,
        req.body.message,
        req.body.label,
        req.body.dueDate
      )
      await this.updateTodoCommandHandler.invoke(command)
      response.status(200).send()
    } catch (error) {
      response.status(404).send(error.message)
    }
  }
}
