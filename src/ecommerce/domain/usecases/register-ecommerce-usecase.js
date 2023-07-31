const { MissingParamError } = require('../../../utils/errors')

module.exports = class RegisterEcommerceUseCase {
  async register (name, description, contactEmail) {
    if (!name) {
      throw new MissingParamError('name')
    }

    if (!description) {
      throw new MissingParamError('description')
    }

    if (!contactEmail) {
      throw new MissingParamError('contactEmail')
    }

    return null
  }
}
