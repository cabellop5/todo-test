import { Service } from 'typedi'
import { Request, Response } from 'express'
import { FindAllTodosQueryHandler } from '../../../application/todo/find/find-all-todos.query.handler'
import { FindAllTodosQuery } from '../../../application/todo/find/find-all-todos.query'

@Service()
export class GetAllTodoController {
  constructor(
    private readonly findAllTodosQueryHandler: FindAllTodosQueryHandler
  ) {}
  public async invoke(req: Request, response: Response): Promise<void> {
    try {
      const todos = await this.findAllTodosQueryHandler.invoke(
        new FindAllTodosQuery()
      )
      response.status(200).send(todos)
    } catch (error) {
      response.status(404).send(error.message)
    }
  }
}
