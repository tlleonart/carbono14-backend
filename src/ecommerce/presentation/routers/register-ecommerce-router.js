const { MissingParamError, InvalidParamError } = require('../../../utils/errors')
const HttpResponse = require('../../../utils/helpers/http-response')

module.exports = class RegisterEcommerceRouter {
  constructor ({ registerEcommerceUseCase, emailValidator } = {}) {
    this.registerEcommerceUseCase = registerEcommerceUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { accessToken } = httpRequest.headers
      const {
        name,
        contactEmail,
        description,
        country,
        isActive
      } = httpRequest.body

      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }

      if (!name) {
        return HttpResponse.badRequest(new MissingParamError('name'))
      }

      if (!contactEmail) {
        return HttpResponse.badRequest(new MissingParamError('contactEmail'))
      }

      if (!this.emailValidator.isValid(contactEmail)) {
        return HttpResponse.badRequest(new InvalidParamError('contactEmail'))
      }

      if (!description) {
        return HttpResponse.badRequest(new MissingParamError('description'))
      }

      if (!country) {
        return HttpResponse.badRequest(new MissingParamError('country'))
      }

      const finalIsActive = isActive !== undefined ? isActive : true

      const ecommerceData = { name, description, contactEmail, country }

      const registeredEcommerce = await this.registerEcommerceUseCase.register(ecommerceData)

      return HttpResponse.created({ isActive: finalIsActive, ...registeredEcommerce })
    } catch (error) {
      console.error(error)
      return HttpResponse.serverError()
    }
  }
}
