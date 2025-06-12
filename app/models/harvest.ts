import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Harvest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare farmId: number

  @column()
  declare baseYear: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}

export interface HarvestSerialized {
  id: number
  name: string
  farmId: number
  baseYear: number
  createdAt: DateTime
}
