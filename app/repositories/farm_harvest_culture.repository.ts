import FarmHarvestCrops, { FarmHarvestCropSerialized } from '#models/farm_harvest_cultures'
import { CropRepository } from './crop.repository.js'

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

interface CropsGrouped {
  cropId: number
  count: number
}
export class FarmHarvestCropRepository extends FarmHarvestCrops {
  static async getByFarmIds(farmIds: number[]) {
    const fhcs = await this.query().whereIn('farm_id', farmIds)
    return fhcs.map((f) => f.serialize()) as FarmHarvestCropSerialized[]
  }

  static async getCropsGroupedCount() {
    const harvestCrops = await this.query()
      .select('crop_id')
      .count('crop_id as count')
      .groupBy('crop_id')

    const allCrops = await CropRepository.getAll()
    return harvestCrops.map((harvestCrop) => {
      const crop = allCrops.find((c) => c.id === harvestCrop.cropId)!
      return {
        cropId: harvestCrop.cropId,
        count: Number(harvestCrop.$extras.count),
        cropName: crop.name,
      }
    }) as CropsGrouped[]
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
