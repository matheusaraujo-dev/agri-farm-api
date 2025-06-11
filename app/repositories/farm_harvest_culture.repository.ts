import FarmHarvestCultures, { FarmHarvestCropSerialized } from '#models/farm_harvest_cultures'

export class FarmHarvestCultureRepository extends FarmHarvestCultures {
  static async getByFarmIds(farmIds: number[]) {
    const fhcs = await this.query().whereIn('farm_id', farmIds)
    return fhcs.map((f) => f.serialize()) as FarmHarvestCropSerialized[]
  }

  static async getByHarvestIds(harvestIds: number[]) {
    const fhcs = await this.query().whereIn('harvest_id', harvestIds)
    return fhcs.map((f) => f.serialize()) as FarmHarvestCropSerialized[]
  }
}
