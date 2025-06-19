import Farm, { FarmSerialized } from '#models/farm'
import { HarvestRepository } from './harvest.repository.js'

export class FarmRepository extends Farm {
  static async getAll() {
    const cultures = await this.query().orderBy('name', 'asc')
    return cultures.map((f) => f.serialize()) as FarmSerialized[]
  }

  static async getFarmsByProducerId(producerId: number) {
    const farms = await this.query().where('producer_id', producerId).orderBy('name', 'asc')
    return farms.map((f) => f.serialize()) as FarmSerialized[]
  }

  static async deleteFarm(farmId: number) {
    await HarvestRepository.deleteHarvestByFarmId(farmId)
    await this.query().where('id', farmId).delete()
  }
}
