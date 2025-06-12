import { z } from 'zod'

export const createFarmValidator = z.object({
  producerId: z.number().int().positive(),
  name: z.string().min(1, 'Name is required'),
  state: z.string().length(2).toUpperCase(),
  city: z.string().min(3),
  address: z.string().min(3),
  totalArea: z.number().min(0),
  cultivatedArea: z.number().min(0),
  vegetationArea: z.number().min(0),
})

export const updateFarmValidator = z.object({
  producerId: z.number().int().positive(),
  name: z.string().min(1, 'Name is required'),
  state: z.string().length(2).toUpperCase(),
  city: z.string().min(3),
  address: z.string().min(3),
  totalArea: z.number().min(0),
  cultivatedArea: z.number().min(0),
  vegetationArea: z.number().min(0),
})
