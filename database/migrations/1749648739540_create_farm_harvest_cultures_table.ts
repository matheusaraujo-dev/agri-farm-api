import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'farm_harvest_crops'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('farm_id').unsigned().notNullable().references('id').inTable('farms')
      table.integer('harvest_id').unsigned().notNullable().references('id').inTable('harvests')
      table.integer('crop_id').unsigned().notNullable().references('id').inTable('crops')
      table.timestamp('created_at')

      table.foreign(['farm_id', 'harvest_id']).references(['farm_id', 'id']).inTable('harvests')
      table.unique(['farm_id', 'harvest_id', 'crop_id'], { indexName: 'unique_farm_harvest_crop' })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
