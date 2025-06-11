import Crop from '#models/crop'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Crop.createMany([
      { name: 'Soja', code: 'soja' },
      { name: 'Milho', code: 'milho' },
      { name: 'Trigo', code: 'trigo' },
      { name: 'Arroz', code: 'arroz' },
      { name: 'Cevada', code: 'cevada' },
      { name: 'Aveia', code: 'aveia' },
      { name: 'Sorgo', code: 'sorgo' },
      { name: 'Centeio', code: 'centeio' },
      { name: 'Girassol', code: 'girassol' },
      { name: 'Algodão', code: 'algodao' },
      { name: 'Cacau', code: 'cacau' },
      { name: 'Café', code: 'cafe' },
      { name: 'Cana-de-açúcar', code: 'cana_de_acucar' },
      { name: 'Tabaco', code: 'tabaco' },
      { name: 'Batata', code: 'batata' },
      { name: 'Tomate', code: 'tomate' },
      { name: 'Cebola', code: 'cebola' },
      { name: 'Alface', code: 'alface' },
      { name: 'Cenoura', code: 'cenoura' },
      { name: 'Pepino', code: 'pepino' },
      { name: 'Pimentão', code: 'pimentao' },
      { name: 'Abóbora', code: 'abobora' },
      { name: 'Melancia', code: 'melancia' },
      { name: 'Melão', code: 'melao' },
      { name: 'Uva', code: 'uva' },
      { name: 'Maçã', code: 'maca' },
      { name: 'Laranja', code: 'laranja' },
      { name: 'Limão', code: 'limao' },
      { name: 'Pera', code: 'pera' },
      { name: 'Pêssego', code: 'pessego' },
      { name: 'Ameixa', code: 'ameixa' },
      { name: 'Abacaxi', code: 'abacaxi' },
    ])
  }
}
