import { Service } from 'typedi'
import { Request, Response } from 'express'
import { FindByIdTodoQuery } from '../../../application/todo/find/find-by-id-todo.query'
import { FindByIdTodoQueryHandler } from '../../../application/todo/find/find-by-id-todo.query.handler'

@Service()
export class GetByIdTodoController {
  constructor(
    private readonly findByIdTodoQueryHandler: FindByIdTodoQueryHandler
  ) {}
  public async invoke(req: Request, response: Response): Promise<void> {
    try {
      const todo = await this.findByIdTodoQueryHandler.invoke(
        new FindByIdTodoQuery(req.params.id)
      )
      response.status(200).send(todo)
    } catch (error) {
      response.status(404).send(error.message)
    }
  }
}
