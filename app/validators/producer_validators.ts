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

export const updateProducerValidator = z.object({
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
