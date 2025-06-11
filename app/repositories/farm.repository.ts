import Farm, { FarmSerialized } from '#models/farm'

export class FarmRepository extends Farm {
  static async getAll() {
    const cultures = await this.query().orderBy('name', 'asc')
    return cultures.map((f) => f.serialize()) as FarmSerialized[]
  }
}
