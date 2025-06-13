import Crop, { CropSerialized } from '#models/crop'

export class CropRepository extends Crop {
  static async getAll() {
    const cultures = await this.all()
    return cultures.map((f) => f.serialize()) as CropSerialized[]
  }
}
