import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class FarmHarvestCrops extends BaseModel {
  static table = 'farm_harvest_crops'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare farmId: number

  @column()
  declare harvestId: number

  @column()
  declare cropId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime
}

export interface FarmHarvestCropSerialized {
  id: number
  farmId: number
  harvestId: number
  cropId: number
  createdAt: string
}
