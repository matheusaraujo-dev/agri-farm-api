import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'harvests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('farm_id').unsigned().notNullable().references('id').inTable('farms')
      table.string('name', 255).notNullable()
      table.integer('base_year').unsigned().notNullable()

      table.timestamp('created_at')

      table.unique(['id', 'farm_id'], { indexName: 'idx_harvests_id_farm_id' })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
