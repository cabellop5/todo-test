import { Service } from 'typedi'
import { Request, Response } from 'express'
import { CreateTodoCommandHandler } from '../../../application/todo/create/create-todo.command.handler'
import { CreateTodoCommand } from '../../../application/todo/create/create-todo.command'

@Service()
export class CreateTodoController {
  constructor(
    private readonly createTodoCommandHandler: CreateTodoCommandHandler
  ) {}

  public async invoke(req: Request, response: Response): Promise<void> {
    try {
      const command = new CreateTodoCommand(
        req.body.id,
        req.body.message,
        req.body.label,
        req.body.dueDate
      )
      await this.createTodoCommandHandler.invoke(command)
      response.status(200).send()
    } catch (error) {
      response.status(404).send(error.message)
    }
  }
}
