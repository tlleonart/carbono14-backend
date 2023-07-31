const { MissingParamError } = require('../../../utils/errors')

module.exports = class RegisterEcommerceUseCase {
  constructor ({ registerEcommerceRepository } = {}) {
    this.registerEcommerceRepository = registerEcommerceRepository
  }

  async register (name, description, contactEmail, country) {
    if (!name) {
      throw new MissingParamError('name')
    }

    if (!description) {
      throw new MissingParamError('description')
    }

    if (!contactEmail) {
      throw new MissingParamError('contactEmail')
    }

    if (!country) {
      throw new MissingParamError('country')
    }

    const isValid = true

    const response = await this.registerEcommerceRepository.register({ name, description, contactEmail, country, isValid })

    return response
  }
}
