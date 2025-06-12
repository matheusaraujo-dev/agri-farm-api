import type { HttpContext } from '@adonisjs/core/http'
import { FarmRepository } from '../repositories/farm.repository.js'

export default class DashboardController {
  async getDashboardData({ response }: HttpContext) {
    const farms = await FarmRepository.getAll()
    const totalFarms = farms.length

    const totalAreasByType = farms.reduce(
      (acc, farm) => ({
        cultivatedArea: acc.cultivatedArea + farm.cultivatedArea,
        vegetationArea: acc.vegetationArea + farm.vegetationArea,
      }),
      { cultivatedArea: 0, vegetationArea: 0 }
    )

    const totalHectares = totalAreasByType.cultivatedArea + totalAreasByType.vegetationArea

    const farmsByState = farms.reduce(
      (acc, farm) => {
        const existing = acc.find((item) => item.state === farm.state)
        if (existing) {
          existing.count++
        } else {
          acc.push({ state: farm.state, count: 1 })
        }
        return acc
      },
      [] as { state: string; count: number }[]
    )

    const landUse = farms.reduce(
      (acc, farm) => ({
        arable: acc.arable + farm.cultivatedArea,
        vegetation: acc.vegetation + farm.vegetationArea,
      }),
      { arable: 0, vegetation: 0 }
    )

    return response.json({ farmsByState, landUse, totalFarms, totalAreasByType, totalHectares })
  }
}
