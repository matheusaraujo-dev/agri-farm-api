import Harvest from '#models/harvest'
import type { HttpContext } from '@adonisjs/core/http'
import { FarmHarvestCropRepository } from '../repositories/farm_harvest_culture.repository.js'
import { CropRepository } from '../repositories/crop.repository.js'
import { FarmRepository } from '../repositories/farm.repository.js'
import { HarvestRepository } from '../repositories/harvest.repository.js'
import { createHarvestValidator, deleteHarvestValidator } from '#validators/harvest_validators'
import {
  addCropToHarvestValidator,
  deleteCropHarvestValidator,
  updateCropHarvestValidator,
} from '#validators/harvest_crop_validators'

export default class HarvestsController {
  async getAll({ response }: HttpContext) {
    const harvests = await Harvest.query().orderBy('base_year', 'desc')
    const fhcs = await FarmHarvestCropRepository.getByHarvestIds(harvests.map((h) => h.id))
    const allCultures = await CropRepository.getAll()

    const harvestsWithCultures = harvests.map((harvest) => {
      const crops = fhcs
        .filter((f) => f.harvestId === harvest.id)
        .map((f) => {
          const crop = allCultures.find((c) => c.id === f.cropId)
          return crop ?? null
        })
      return {
        ...harvest.serialize(),
        crops,
      }
    })

    return response.json({ harvests: harvestsWithCultures })
  }

  async create({ request, response }: HttpContext) {
    const validator = createHarvestValidator.safeParse(request.body())
    if (!validator.success) {
      return response.status(422).json(validator.error.format())
    }
    const data = validator.data

    const harvest = await Harvest.create({
      farmId: data.farmId,
      name: data.name,
      baseYear: data.baseYear,
    })

    return response.status(201).json({ harvest })
  }

  async addCropToHarvest({ request, response }: HttpContext) {
    const validator = await addCropToHarvestValidator.safeParseAsync(request.body())

    if (!validator.success) {
      return response.status(422).json(validator.error.format())
    }
    const { cropId, farmId, harvestId } = validator.data

    const farm = await FarmRepository.find(farmId)
    if (!farm) {
      return response.status(404).json({ error: 'Farm not found.' })
    }

    const harvest = await Harvest.find(harvestId)
    if (!harvest) {
      return response.status(404).json({ error: 'Harvest not found.' })
    }

    const crop = await CropRepository.find(cropId)
    if (!crop) {
      return response.status(404).json({ error: 'Crop not found.' })
    }

    await FarmHarvestCropRepository.create({
      harvestId,
      cropId,
      farmId,
    })

    return response.status(201).json({ message: 'Crop added to harvest successfully.' })
  }

  async updageCropToHarvest({ request, response }: HttpContext) {
    const validator = await updateCropHarvestValidator.safeParseAsync(request.body())

    if (!validator.success) {
      return response.status(422).json(validator.error.format())
    }
    const { newCropId, oldCropId, farmId, harvestId } = validator.data

    const item = await FarmHarvestCropRepository.query()
      .where('farm_id', farmId)
      .andWhere('harvest_id', harvestId)
      .andWhere('crop_id', oldCropId)
      .first()

    if (!item) {
      return response.status(404).json({ error: 'Crop not found in the specified harvest.' })
    }

    await FarmHarvestCropRepository.updateHarvestCrop({
      harvestId,
      newCropId,
      farmId,
      oldCropId,
    })

    return response.status(201).json({ message: 'Crop updated to harvest successfully.' })
  }

  async deleteCropToHarvest({ request, response }: HttpContext) {
    const validator = await deleteCropHarvestValidator.safeParseAsync(request.body())

    if (!validator.success) {
      return response.status(422).json(validator.error.format())
    }
    const { cropId, farmId, harvestId } = validator.data

    const item = await FarmHarvestCropRepository.query()
      .where('farm_id', farmId)
      .andWhere('harvest_id', harvestId)
      .andWhere('crop_id', cropId)
      .first()

    if (!item) {
      return response.status(404).json({ error: 'Crop not found in the specified harvest.' })
    }

    await FarmHarvestCropRepository.deleteHarvestCrop({
      harvestId,
      cropId,
      farmId,
    })

    return response.status(201).json({ message: 'Crop deleted to harvest successfully.' })
  }

  async deleteHarvest({ request, response }: HttpContext) {
    const validator = await deleteHarvestValidator.safeParseAsync(request.body())

    if (!validator.success) {
      return response.status(422).json(validator.error.format())
    }
    const { harvestId } = validator.data

    const item = await HarvestRepository.query().where('id', harvestId).first()

    if (!item) {
      return response.status(404).json({ error: 'Crop not found in the specified harvest.' })
    }

    await HarvestRepository.deleteHarvest(harvestId)

    return response.status(201).json({ message: 'Harvest deleted successfully.' })
  }
}
