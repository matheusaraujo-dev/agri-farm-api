import Harvest from '#models/harvest'
import { createHarvestValidator } from '#validators/index'
import type { HttpContext } from '@adonisjs/core/http'
import { FarmHarvestCultureRepository } from '../repositories/farm_harvest_culture.repository.js'
import { CropRepository } from '../repositories/crop.repository.js'

export default class HarvestsController {
  async getAll({ response }: HttpContext) {
    const harvests = await Harvest.query().orderBy('base_year', 'desc')
    const fhcs = await FarmHarvestCultureRepository.getByHarvestIds(harvests.map((h) => h.id))
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
}
