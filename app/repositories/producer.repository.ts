import Producer, { ProducerSerialized } from '#models/producer'
import { FarmRepository } from './farm.repository.js'

export class ProducerRepository extends Producer {
  static async getAll() {
    const cultures = await this.query().orderBy('name', 'asc')
    return cultures.map((f) => f.serialize()) as ProducerSerialized[]
  }

  static async deleteProducer(producerId: number) {
    const farms = await FarmRepository.getFarmsByProducerId(producerId)
    if (farms.length > 0) {
      await Promise.all(farms.map((farm) => FarmRepository.deleteFarm(farm.id)))
    }
    await this.query().where('id', producerId).delete()
  }
}
