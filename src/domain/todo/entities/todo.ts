import { Label } from '../../label/entities/label'

export type Todo = {
  id: string
  message: string
  label: Label
  dueDate: Date
}
