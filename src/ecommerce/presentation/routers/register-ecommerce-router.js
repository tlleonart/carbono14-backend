const { MissingParamError } = require('../../../utils/errors')
const HttpResponse = require('../../../utils/helpers/http-response')

module.exports = class RegisterEcommerceRouter {
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

      if (!description) {
        return HttpResponse.badRequest(new MissingParamError('description'))
      }

      if (!country) {
        return HttpResponse.badRequest(new MissingParamError('country'))
      }
    } catch (error) {
      // console.error(error)
      return HttpResponse.serverError()
    }
  }
}
