const { MissingParamError } = require('../../../utils/errors')

module.exports = class RegisterEcommerceUseCase {
  async register (name) {
    if (!name) {
      throw new MissingParamError('name')
    }
    return null
  }
}
