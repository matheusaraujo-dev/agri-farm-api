import { createProducerValidator, updateProducerValidator } from '#validators/producer_validators'
import type { HttpContext } from '@adonisjs/core/http'
import { ProducerRepository } from '../repositories/producer.repository.js'

export default class ProducersController {
  async getAll({ response }: HttpContext) {
    const producers = await ProducerRepository.query().orderBy('name', 'asc')

    return response.json({ producers })
  }

  async createProducer({ request, response }: HttpContext) {
    const validator = createProducerValidator.safeParse(request.body())
    if (!validator.success) {
      return response.status(422).json(validator.error.format())
    }

    const data = validator.data
    const producer = await ProducerRepository.create(data)

    return response.status(201).json({ producer })
  }

  async updateProducer({ request, response }: HttpContext) {
    const producerId = Number(request.param('producerId'))
    const validator = updateProducerValidator.safeParse(request.body())
    if (!validator.success) {
      return response.status(422).json(validator.error.format())
    }

    const data = validator.data
    const producer = await ProducerRepository.query().where('id', producerId).first()
    if (!producer) {
      return response.status(404).json({ error: `Producer not found for id ${producerId}` })
    }

    await ProducerRepository.query().where('id', producerId).update(data)

    return response.status(201).json({ message: 'Producer updated successfully' })
  }

  async deleteProducer({ request, response }: HttpContext) {
    const producerId = Number(request.param('producerId'))
    const producer = await ProducerRepository.query().where('id', producerId).first()
    if (!producer) {
      return response.status(404).json({ error: `Producer not found for id ${producerId}` })
    }

    await ProducerRepository.deleteProducer(producerId)
    return response.status(204).json({ message: 'Producer deleted successfully' })
  }
}
