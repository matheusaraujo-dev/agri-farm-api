import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Farm extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare producerId: number

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare city: string

  @column()
  declare state: string

  @column({ serialize: Number })
  declare totalArea: number

  @column({ serialize: Number })
  declare cultivatedArea: number

  @column({ serialize: Number })
  declare vegetationArea: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}

export interface FarmSerialized {
  id: number
  producerId: number
  name: string
  address: string
  city: string
  state: string
  totalArea: number
  cultivatedArea: number
  vegetationArea: number
  createdAt: string
}
