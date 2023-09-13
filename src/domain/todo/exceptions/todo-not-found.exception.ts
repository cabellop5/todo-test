export class TodoNotFoundException extends Error {
  constructor(todo: string) {
    super(`Todo "${todo}" was not found`)
  }
}
