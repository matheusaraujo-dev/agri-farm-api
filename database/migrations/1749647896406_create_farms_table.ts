import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'farms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('producer_id').unsigned().references('id').inTable('producers').notNullable()
      table.string('name', 255).notNullable()
      table.string('address', 255).notNullable()
      table.string('city', 100).notNullable()
      table.string('state', 2).notNullable()
      table.decimal('total_area', 8, 2).notNullable()
      table.decimal('cultivated_area', 8, 2).notNullable()
      table.decimal('vegetation_area', 8, 2).notNullable()

      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
