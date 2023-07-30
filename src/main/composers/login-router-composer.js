const LoginRouter = require('../../auth/presentation/routers/login-router')
const AuthUseCase = require('../../auth/domain/usecases/auth-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')
const LoadUserByEmailRepository = require('../../auth/infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../auth/infra/repositories/update-access-token-repository')
const Enctrypter = require('../../utils/helpers/encrypter')
const TokenGenerator = require('../../utils/helpers/token-generator')
const env = require('../config/env')

module.exports = class LoginRouterComposer {
  static compose () {
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const encrypter = new Enctrypter()
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const emailValidator = new EmailValidator()
    const authUseCase = new AuthUseCase({
      loadUserByEmailRepository,
      updateAccessTokenRepository,
      encrypter,
      tokenGenerator
    })
    return new LoginRouter({
      authUseCase,
      emailValidator
    })
  }
}
