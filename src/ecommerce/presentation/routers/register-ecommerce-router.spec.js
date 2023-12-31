const { UnauthorizedError, ServerError } = require('../../../auth/presentation/errors')
const { MissingParamError, InvalidParamError } = require('../../../utils/errors')
const RegisterEcommerceRouter = require('./register-ecommerce-router')

const makeSut = () => {
  const registerEcommerceUseCaseSpy = makeRegisterEcommerceUseCase()
  const emailValidatorSpy = makeEmailValidator()
  const sut = new RegisterEcommerceRouter({
    registerEcommerceUseCase: registerEcommerceUseCaseSpy,
    emailValidator: emailValidatorSpy
  })

  return {
    sut,
    registerEcommerceUseCaseSpy,
    emailValidatorSpy
  }
}

const makeEmailValidator = () => {
  class EmailValidatorSpy {
    isValid (email) {
      this.email = email
      return this.isEmailValid
    }
  }

  const emailValidatorSpy = new EmailValidatorSpy()
  emailValidatorSpy.isEmailValid = true

  return emailValidatorSpy
}

const makeEmailValidatorWithError = () => {
  class EmailValidatorSpy {
    isValid () {
      throw new Error()
    }
  }

  return new EmailValidatorSpy()
}

const makeRegisterEcommerceUseCase = () => {
  class RegisterEcommerceUseCaseSpy {
    async register (ecommerceData) {
      this.ecommerceData = ecommerceData

      return this.registeredEcommerce
    }
  }

  const registerEcommerceUseCaseSpy = new RegisterEcommerceUseCaseSpy()
  RegisterEcommerceUseCaseSpy.registeredEcommerce = {
    id: 'valid_id',
    name: 'valid_name',
    contactEmail: 'valid_email',
    description: 'valid_description',
    country: 'valid_country',
    isActive: true
  }

  return registerEcommerceUseCaseSpy
}

const makeRegisterEcommerceUseCaseWithError = () => {
  class RegisterEcommerceUseCaseSpy {
    async register (ecommerceData) {
      throw new Error()
    }
  }

  return new RegisterEcommerceUseCaseSpy()
}

describe('Register Ecommerce Route', () => {
  test('Should return 401 if no accessToken is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {},
      body: {}
    }
    const httpReponse = await sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(401)
    expect(httpReponse.body.error).toBe(new UnauthorizedError().message)
  })

  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {}
    }
    const httpReponse = await sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body.error).toBe(new MissingParamError('name').message)
  })

  test('Should return 400 if no contactEmail is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name'
      }
    }
    const httpReponse = await sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body.error).toBe(new MissingParamError('contactEmail').message)
  })

  test('Should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name',
        contactEmail: 'valid_email'
      }
    }
    const httpReponse = await sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body.error).toBe(new MissingParamError('description').message)
  })

  test('Should return 400 if no country is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name',
        contactEmail: 'valid_email',
        description: 'valid_description'
      }
    }
    const httpReponse = await sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body.error).toBe(new MissingParamError('country').message)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if no httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({
      headers: {}
    })
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if no httpRequest has no headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({
      body: {}
    })
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call RegisterEcommerceUseCase with correct params', async () => {
    const { sut, registerEcommerceUseCaseSpy } = makeSut()
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name',
        contactEmail: 'valid_email',
        description: 'valid_description',
        country: 'valid_country'
      }
    }
    await sut.route(httpRequest)
    expect(registerEcommerceUseCaseSpy.ecommerceData).toEqual(httpRequest.body)
  })

  test('Should return 500 if RegisterEcommerceUseCase throws', async () => {
    const authUseCaseSpy = makeRegisterEcommerceUseCaseWithError()
    const sut = new RegisterEcommerceRouter(authUseCaseSpy)
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name',
        contactEmail: 'valid_email',
        description: 'valid_description',
        country: 'valid_country'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name',
        contactEmail: 'invalid_email',
        description: 'valid_description',
        country: 'valid_country'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new InvalidParamError('contactEmail').message)
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const emailValidatorSpy = makeEmailValidatorWithError()
    const sut = new RegisterEcommerceRouter({
      emailValidator: emailValidatorSpy
    })

    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name',
        contactEmail: 'valid_email',
        description: 'valid_description',
        country: 'valid_country'
      }
    }

    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name',
        contactEmail: 'valid_email',
        description: 'valid_description',
        country: 'valid_country'
      }
    }
    await sut.route(httpRequest)
    expect(emailValidatorSpy.email).toBe(httpRequest.body.contactEmail)
  })

  test('Should throw if invalid dependencies are provided', async () => {
    const invalid = {}
    const registerEcommerceUseCase = makeRegisterEcommerceUseCase()

    const suts = [].concat(
      new RegisterEcommerceRouter(),
      new RegisterEcommerceRouter({}),
      new RegisterEcommerceRouter({
        registerEcommerceUseCase: invalid
      }),
      new RegisterEcommerceRouter({
        registerEcommerceUseCase
      }),
      new RegisterEcommerceRouter({
        registerEcommerceUseCase,
        emailValidator: invalid
      })
    )

    for (const sut of suts) {
      const httpRequest = {
        headers: {
          accessToken: 'valid_token'
        },
        body: {
          name: 'valid_name',
          contactEmail: 'valid_email',
          description: 'valid_description',
          country: 'valid_country'
        }
      }

      const httpResponse = await sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toBe(new ServerError().message)
    }
  })

  test('Should return 201 with isActive true if valid properties are provided and no isActive is specify', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name',
        contactEmail: 'valid_email',
        description: 'valid_description',
        country: 'valid_country'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body.isActive).toBe(true)
  })

  test('Should set isActive to true if it is not provided in the request body', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name',
        contactEmail: 'valid_email',
        description: 'valid_description',
        country: 'valid_country'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.body.isActive).toBe(true)
  })

  test('Should set isActive to false if provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        accessToken: 'valid_token'
      },
      body: {
        name: 'valid_name',
        contactEmail: 'valid_email',
        description: 'valid_description',
        country: 'valid_country',
        isActive: false
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.body.isActive).toBe(false)
  })
})
