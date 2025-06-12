import { z } from 'zod'

export const createHarvestValidator = z.object({
  farmId: z.number().int().positive(),
  name: z.string().min(1, 'Name is required'),
  baseYear: z
    .number()
    .int()
    .min(1900, 'Base year must be after 1900')
    .max(new Date().getFullYear() + 1, 'Base year cannot be in the future'),
})

export const deleteHarvestValidator = z.object({
  harvestId: z.number().int().positive(),
})
