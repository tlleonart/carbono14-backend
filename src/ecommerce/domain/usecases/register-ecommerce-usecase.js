const { MissingParamError } = require('../../../utils/errors')

module.exports = class RegisterEcommerceUseCase {
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

    return null
  }
}
