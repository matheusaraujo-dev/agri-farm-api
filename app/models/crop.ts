import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Crop extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare code: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime
}

export interface CropSerialized {
  id: number
  name: string
  code: string
  createdAt: string
}
