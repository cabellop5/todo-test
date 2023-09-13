export class UpdateTodoCommand {
  constructor(
    public readonly id: string,
    public readonly message: string,
    public readonly label: string,
    public readonly dueDate: string
  ) {}
}
