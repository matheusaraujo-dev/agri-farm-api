import FarmHarvestCrops from '#models/farm_harvest_cultures'
import Harvest, { HarvestSerialized } from '#models/harvest'

export class HarvestRepository extends Harvest {
  static async getAll() {
    const cultures = await this.query().orderBy('name', 'asc')
    return cultures.map((f) => f.serialize()) as HarvestSerialized[]
  }

  static async deleteHarvest(id: number) {
    const harvest = await this.find(id)
    if (!harvest) {
      throw new Error('Harvest not found')
    }
    await FarmHarvestCrops.query().where('harvest_id', harvest.id).delete()
    await harvest.delete()
    return harvest
  }

  static async deleteHarvestByFarmId(farmId: number) {
    await FarmHarvestCrops.query().where('farm_id', farmId).delete()
    await this.query().where('farm_id', farmId).delete()
  }
}
