import { Service } from 'typedi'
import { LabelByIdFinder } from '../../../domain/label/services/find/label-by-id.finder'
import { Todo } from '../../../domain/todo/entities/todo'

@Service()
export class PostgreTodoParser {
  constructor(private readonly labelByIdFinder: LabelByIdFinder) {}

  public async fromArray(data: Array<any>): Promise<Todo> {
    const label = await this.labelByIdFinder.invoke(<string>data[2])

    return {
      id: <string>data[0],
      message: <string>data[1],
      label: label,
      dueDate: <Date>data[3],
    }
  }
}
