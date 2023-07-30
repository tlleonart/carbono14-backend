const { MissingParamError, InvalidParamError } = require('../../../utils/errors')
const HttpResponse = require('../../../utils/helpers/http-response')

module.exports = class RegisterEcommerceRouter {
  constructor ({ emailValidator } = {}) {
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { accessToken } = httpRequest.headers
      const {
        name,
        contactEmail,
        description,
        country
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

      return HttpResponse.created({ ...httpRequest.body, isActive: true })
    } catch (error) {
      // console.error(error)
      return HttpResponse.serverError()
    }
  }
}
