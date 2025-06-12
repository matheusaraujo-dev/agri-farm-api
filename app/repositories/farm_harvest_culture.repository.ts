import FarmHarvestCrops, { FarmHarvestCropSerialized } from '#models/farm_harvest_cultures'

interface UpdateHarvestCropInput {
  farmId: number
  harvestId: number
  oldCropId: number
  newCropId: number
}

interface DeleteHarvestCropInput {
  farmId: number
  harvestId: number
  cropId: number
}
export class FarmHarvestCultureRepository extends FarmHarvestCrops {
  static async getByFarmIds(farmIds: number[]) {
    const fhcs = await this.query().whereIn('farm_id', farmIds)
    return fhcs.map((f) => f.serialize()) as FarmHarvestCropSerialized[]
  }

  static async getByHarvestIds(harvestIds: number[]) {
    const fhcs = await this.query().whereIn('harvest_id', harvestIds)
    return fhcs.map((f) => f.serialize()) as FarmHarvestCropSerialized[]
  }

  static async updateHarvestCrop(input: UpdateHarvestCropInput) {
    await this.query()
      .update({
        crop_id: input.newCropId,
      })
      .where('farm_id', input.farmId)
      .andWhere('harvest_id', input.harvestId)
      .andWhere('crop_id', input.oldCropId)
  }

  static async deleteHarvestCrop(input: DeleteHarvestCropInput) {
    await this.query()
      .where('farm_id', input.farmId)
      .andWhere('harvest_id', input.harvestId)
      .andWhere('crop_id', input.cropId)
      .delete()
  }
}
