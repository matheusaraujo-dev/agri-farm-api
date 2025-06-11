import { ValidationService } from '../domain/contracts/validation_service.js'

export class BrazilianValidationService implements ValidationService {
  validateCpfCnpj(value: string): boolean {
    const cleaned = value.replace(/[^\d]/g, '')
    return cleaned.length === 11 ? this.validateCPF(value) : this.validateCNPJ(value)
  }

  private validateCPF(cpf: string): boolean {
    const cleaned = cpf.replace(/[^\d]/g, '')

    if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) {
      return false
    }

    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(cleaned.charAt(i)) * (10 - i)
    }
    let remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cleaned.charAt(9))) return false

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += Number.parseInt(cleaned.charAt(i)) * (11 - i)
    }
    remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0

    return remainder === Number.parseInt(cleaned.charAt(10))
  }

  private validateCNPJ(cnpj: string): boolean {
    const cleaned = cnpj.replace(/[^\d]/g, '')

    if (cleaned.length !== 14) return false

    if (/^(\d)\1{13}$/.test(cleaned)) return false

    let sum = 0
    let pos = 5
    for (let i = 0; i < 12; i++) {
      sum += Number.parseInt(cleaned.charAt(i)) * pos--
      if (pos < 2) pos = 9
    }
    let remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (remainder !== Number.parseInt(cleaned.charAt(12))) return false

    sum = 0
    pos = 6
    for (let i = 0; i < 13; i++) {
      sum += Number.parseInt(cleaned.charAt(i)) * pos--
      if (pos < 2) pos = 9
    }
    remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11)

    return remainder === Number.parseInt(cleaned.charAt(13))
  }
}
