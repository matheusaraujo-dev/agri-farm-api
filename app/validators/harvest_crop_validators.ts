import { z } from 'zod'

export const addCropToHarvestValidator = z.object({
  farmId: z.number().int().positive(),
  harvestId: z.number().int().positive(),
  cropId: z.number().int().positive(),
})

export const deleteCropHarvestValidator = z.object({
  farmId: z.number().int().positive(),
  harvestId: z.number().int().positive(),
  cropId: z.number().int().positive(),
})

export const updateCropHarvestValidator = z.object({
  farmId: z.number().int().positive(),
  harvestId: z.number().int().positive(),
  oldCropId: z.number().int().positive(),
  newCropId: z.number().int().positive(),
})
