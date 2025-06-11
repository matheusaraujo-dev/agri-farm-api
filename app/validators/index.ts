import { BrazilianValidationService } from '#services/brazilian_validation_service'
import { z } from 'zod'

export const createProducerValidator = z.object({
  name: z.string().min(1, 'Name is required'),
  document: z
    .string()
    .min(11)
    .max(14)
    .regex(/^\d+$/, 'Document must contain only numbers')
    .refine(
      (val) => {
        const brazilValidation = new BrazilianValidationService()
        return brazilValidation.validateCpfCnpj(val)
      },
      { message: 'Invalid CPF or CNPJ' }
    ),
})

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

export const createHarvestValidator = z.object({
  farmId: z.number().int().positive(),
  name: z.string().min(1, 'Name is required'),
  baseYear: z
    .number()
    .int()
    .min(1900, 'Base year must be after 1900')
    .max(new Date().getFullYear() + 1, 'Base year cannot be in the future'),
  // You can add more fields here if needed
})
