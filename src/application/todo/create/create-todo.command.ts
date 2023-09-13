export class CreateTodoCommand {
  constructor(
    public readonly id: string | undefined,
    public readonly message: string,
    public readonly label: string,
    public readonly dueDate: string
  ) {}
}
