import Crop from '#models/crop'
import type { HttpContext } from '@adonisjs/core/http'

export default class CropsController {
  async getAll({ response }: HttpContext) {
    const crops = await Crop.query().orderBy('name', 'asc')

    return response.json({ crops })
  }
}
