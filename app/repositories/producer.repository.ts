import Producer, { ProducerSerialized } from '#models/producer'

export class ProducerRepository extends Producer {
  static async getAll() {
    const cultures = await this.query().orderBy('name', 'asc')
    return cultures.map((f) => f.serialize()) as ProducerSerialized[]
  }
}
