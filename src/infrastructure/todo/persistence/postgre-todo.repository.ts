import { Service } from 'typedi'
import { TodoRepository } from '../../../domain/todo/repository/todo.repository'
import { Todo } from '../../../domain/todo/entities/todo'
import { Client, Query, ResultIterator } from 'ts-postgres'
import { TodoNotFoundException } from '../../../domain/todo/exceptions/todo-not-found.exception'
import { PostgreTodoParser } from './postgre-todo.parser'

@Service()
export class PostgreTodoRepository implements TodoRepository {
  constructor(private readonly todoParser: PostgreTodoParser) {}

  async findById(id: string): Promise<Todo | undefined> {
    const result = await this.executeQuery(
      new Query('SELECT * FROM todo WHERE id = $1::uuid;', [id])
    )

    if (result.rows.length === 0) {
      throw new TodoNotFoundException(id)
    }

    return this.todoParser.fromArray(result.rows[0])
  }

  async delete(todo: Todo): Promise<void> {
    await this.executeQuery(
      new Query('DELETE FROM todo WHERE id = $1::uuid;', [todo.id])
    )
  }

  async findAll(): Promise<Todo[] | undefined> {
    const result = await this.executeQuery(new Query('SELECT * FROM todo;'))

    return Promise.all(
      result.rows.map((element): Promise<Todo> => {
        return this.todoParser.fromArray(element)
      })
    )
  }

  async create(todo: Todo): Promise<void> {
    await this.executeQuery(
      new Query(
        'INSERT INTO todo(id, message, label, due_date) VALUES ($1::uuid, $2::text, $3::text, $4::timestamp(0));',
        [todo.id, todo.message, todo.label.id, todo.dueDate]
      )
    )
  }

  async update(todo: Todo): Promise<void> {
    await this.executeQuery(
      new Query(
        'UPDATE todo SET message = $1::text, label = $2::text, due_date = $3::timestamp(0) WHERE id = $4::uuid;',
        [todo.message, todo.label.id, todo.dueDate, todo.id]
      )
    )
  }

  private async executeQuery(query: Query): Promise<ResultIterator> {
    const client = await this.getClient()
    const result = await client.execute(query)
    await client.end()
    return result
  }

  private async getClient(): Promise<Client> {
    const client = new Client({
      host: <string>process.env.DATABASE_HOST,
      port: <number>(<unknown>process.env.DATABASE_PORT),
      user: <string>process.env.DATABASE_USER,
      password: <string>process.env.DATABASE_PASSWORD,
      database: <string>process.env.DATABASE_NAME,
    })
    await client.connect()
    return client
  }
}
