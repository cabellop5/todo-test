import { LabelResponse } from '../../label/shared/label.response'

export interface TodoResponse {
  id: string
  message: string
  label: LabelResponse
  dueDate: string
}
