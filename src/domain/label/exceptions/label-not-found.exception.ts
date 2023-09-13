export class LabelNotFoundException extends Error {
  constructor(label: string) {
    super(`Label "${label}" was not found`)
  }
}
