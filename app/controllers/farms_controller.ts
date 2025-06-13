import Farm from '#models/farm'
import type { HttpContext } from '@adonisjs/core/http'
import { FarmHarvestCropRepository } from '../repositories/farm_harvest_culture.repository.js'
import Crop from '#models/crop'
import Harvest from '#models/harvest'
import { createFarmValidator, updateFarmValidator } from '#validators/farm_validators'
import { ProducerRepository } from '../repositories/producer.repository.js'
import { FarmRepository } from '../repositories/farm.repository.js'

export default class FarmsController {
  async getAll({ response }: HttpContext) {
    const farms = await Farm.query().orderBy('name', 'asc')
    const farmIds = farms.map((farm) => farm.id)

    const producerIds = farms.map((farm) => farm.producerId)
    const producers = await ProducerRepository.query().whereIn('id', producerIds)
    const cultures = await Crop.all()
    const harvests = await Harvest.query().whereIn('farm_id', farmIds)
    const harvCropByFarm = await FarmHarvestCropRepository.getByFarmIds(farmIds)

    const responseData = farms.map((farm) => {
      const producer = producers.find((p) => p.id === farm.producerId)
      const harvestsByFarm = harvests
        .filter((h) => h.farmId === farm.id)
        .map((hv) => {
          const harvestCropsForHarvest = harvCropByFarm.filter((hc) => hc.harvestId === hv.id)
          const cropsForHarvest = harvestCropsForHarvest
            .map((hc) => {
              const crop = cultures.find((c) => c.id === hc.cropId)
              return crop ? crop.serialize() : null
            })
            .filter((c) => c !== null)

          return {
            ...hv.serialize(),
            cultures: cropsForHarvest,
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
    const existingProducer = await ProducerRepository.find(data.producerId)
    if (!existingProducer) {
      return response.status(404).json({ error: `Producer not found for id ${data.producerId}` })
    }

    const farmData = data

    const farm = await Farm.create(farmData)

    return response.status(201).json({ farm })
  }

  async updateFarm({ request, response }: HttpContext) {
    const farmId = Number(request.param('farmId'))
    const validator = updateFarmValidator.safeParse(request.body())
    if (!validator.success) {
      return response.status(422).json(validator.error.format())
    }

    const data = validator.data

    const farm = await FarmRepository.find(farmId)
    if (!farm) {
      return response.status(404).json({ error: `Farm not found for id ${farmId}` })
    }

    const existingProducer = await ProducerRepository.find(data.producerId)
    if (!existingProducer) {
      return response.status(404).json({ error: `Producer not found for id ${data.producerId}` })
    }

    await FarmRepository.query()
      .where('id', farmId)
      .update({
        ...data,
      })

    return response.status(201).json({ message: 'Farm updated successfully' })
  }

  async deleteFarm({ request, response }: HttpContext) {
    const farmId = Number(request.param('farmId'))

    const farm = await FarmRepository.find(farmId)
    if (!farm) {
      return response.status(404).json({ error: `Farm not found for id ${farmId}` })
    }

    await FarmRepository.deleteFarm(farmId)

    return response.status(201).json({ message: 'Farm deleted successfully' })
  }
}
