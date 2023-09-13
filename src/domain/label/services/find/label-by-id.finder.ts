import { Label } from '../../entities/label'
import { Inject, Service } from 'typedi'
import { LabelRepository } from '../../repository/label.repository'

@Service()
export class LabelByIdFinder {
  constructor(
    @Inject('LabelRepository')
    private readonly labelRepository: LabelRepository
  ) {}

  public invoke(id: string): Promise<Label | undefined> {
    return this.labelRepository.findById(id)
  }
}
