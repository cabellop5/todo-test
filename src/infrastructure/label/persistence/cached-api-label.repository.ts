import { LabelRepository } from '../../../domain/label/repository/label.repository'
import { Label } from '../../../domain/label/entities/label'
import LRU_TTL from 'lru-ttl-cache'
import axios from 'axios'
import { Service } from 'typedi'

const cache = new LRU_TTL({ ttl: '15m', ttlInterval: '60s' })

@Service()
export class CachedApiLabelRepository implements LabelRepository {
  async findById(id: string): Promise<Label | undefined> {
    const labels = await this.getLabels()

    return labels.find((element) => element.id === id)
  }

  private async getLabels(): Promise<Label[]> {
    const keyCache = 'cached_api_label_repository'

    if (cache.has(keyCache)) {
      return cache.get(keyCache) as Label[]
    }

    const response = await axios.get<Record<string, any>>(
      'https://nptwpxthvb.eu-west-1.awsapprunner.com/labels',
      { headers: { accept: 'application/json' } }
    )

    cache.set(keyCache, response.data)

    return response.data as Label[]
  }
}
