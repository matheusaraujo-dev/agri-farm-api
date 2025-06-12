import Producer from '#models/producer'
import { createProducerValidator } from '#validators/producer_validators'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProducersController {
  async getAll({ response }: HttpContext) {
    const producers = await Producer.query().orderBy('name', 'asc')

    return response.json({ producers })
  }

  async create({ request, response }: HttpContext) {
    const validator = createProducerValidator.safeParse(request.body())
    if (!validator.success) {
      return response.status(422).json(validator.error.format())
    }

    const data = validator.data
    const producer = await Producer.create(data)

    return response.status(201).json({ producer })
  }
}
