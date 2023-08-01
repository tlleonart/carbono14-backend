const RegisterEcommerceRouter = require('../../ecommerce/presentation/routers/register-ecommerce-router')
const RegisterEcommerceUseCase = require('../../ecommerce/domain/usecases/register-ecommerce-usecase')
const RegisterEcommerceRepository = require('../../ecommerce/infra/repositories/register-ecommerce-repository')
const EmailValidator = require('../../utils/helpers/email-validator')

module.exports = class RegisterEcommerceRouterComposer {
  static compose () {
    const registerEcommerceRepository = new RegisterEcommerceRepository()
    const registerEcommerceUseCase = new RegisterEcommerceUseCase({
      registerEcommerceRepository
    })
    const emailValidator = new EmailValidator()

    return new RegisterEcommerceRouter({
      registerEcommerceUseCase,
      emailValidator
    })
  }
}
