import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Producer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare document: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}

export interface ProducerSerialized {
  id: number
  name: string
  document: string
  createdAt: string
}
