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

    const ecommerceModel = await MongoHelper.getCollection('ecommerces')

    await ecommerceModel.insertOne({
      name,
      description,
      contactEmail,
      country,
      isActive
    })
  }
}
