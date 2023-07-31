const { MissingParamError } = require('../../../utils/errors')

module.exports = class RegisterEcommerceUseCase {
  async register (name, description) {
    if (!name) {
      throw new MissingParamError('name')
    }

    if (!description) {
      throw new MissingParamError('description')
    }

    return null
  }
}
