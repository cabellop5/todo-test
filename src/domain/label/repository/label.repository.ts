import { Label } from '../entities/label'

export interface LabelRepository {
  findById(id: string): Promise<Label | undefined>
}
