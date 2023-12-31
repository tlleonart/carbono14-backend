const { MissingParamError } = require('../../../utils/errors')
const MongoHelper = require('../../../utils/helpers/mongo-helper')

module.exports = class RegisterEcommerceRepository {
  async register ({
    name,
    description,
    contactEmail,
    country,
    isActive
  }) {
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

    this.isActive = !isActive ? true : isActive

    const ecommerceModel = await MongoHelper.getCollection('ecommerces')

    await ecommerceModel.insertOne({
      name,
      description,
      contactEmail,
      country,
      isActive: this.isActive
    })
  }
}
