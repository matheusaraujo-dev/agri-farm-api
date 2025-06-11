import Farm from '#models/farm'
import Producer from '#models/producer'
import { createFarmValidator } from '#validators/index'
import type { HttpContext } from '@adonisjs/core/http'
import { FarmHarvestCultureRepository } from '../repositories/farm_harvest_culture.repository.js'
import Crop from '#models/crop'
import Harvest from '#models/harvest'

export default class FarmsController {
  async getAll({ response }: HttpContext) {
    const farms = await Farm.query().orderBy('name', 'asc')
    const farmIds = farms.map((farm) => farm.id)

    const producerIds = farms.map((farm) => farm.producerId)
    const producers = await Producer.query().whereIn('id', producerIds)
    const cultures = await Crop.all()
    const harvests = await Harvest.query().whereIn('farm_id', farmIds)
    const harvestCultures = await FarmHarvestCultureRepository.getByFarmIds(farmIds)

    const responseData = farms.map((farm) => {
      const producer = producers.find((p) => p.id === farm.producerId)
      const harvestsByFarm = harvests
        .filter((h) => h.farmId === farm.id)
        .map((hv) => {
          const harvestCulturesForHarvest = harvestCultures.filter((hc) => hc.harvestId === hv.id)
          const culturesForHarvest = harvestCulturesForHarvest
            .map((hc) => {
              const culture = cultures.find((c) => c.id === hc.cultureId)
              return culture ? culture.serialize() : null
            })
            .filter((c) => c !== null)

          return {
            ...hv.serialize(),
            cultures: culturesForHarvest,
          }
        })

      return {
        ...farm.serialize(),
        producer: producer ? producer.serialize() : null,
        harvests: harvestsByFarm,
      }
    })

    return response.json({ farms: responseData })
  }

  async create({ request, response }: HttpContext) {
    const validator = createFarmValidator.safeParse(request.body())
    if (!validator.success) {
      return response.status(422).json(validator.error.format())
    }

    const data = validator.data
    const existingProducer = await Producer.find(data.producerId)
    if (!existingProducer) {
      return response.status(404).json({ error: `Producer not found for id ${data.producerId}` })
    }

    const farmData = data

    const farm = await Farm.create(farmData)

    return response.status(201).json({ farm })
  }
}
