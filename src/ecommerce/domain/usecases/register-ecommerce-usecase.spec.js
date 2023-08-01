const { MissingParamError } = require('../../../utils/errors')
const RegisterEcommerceUseCase = require('./register-ecommerce-usecase')

const makeSut = () => {
  const registerEcommerceRepositorySpy = makeRegisterEcommerceRepository()
  const sut = new RegisterEcommerceUseCase({
    registerEcommerceRepository: registerEcommerceRepositorySpy
  })

  return {
    sut,
    registerEcommerceRepositorySpy
  }
}

const makeRegisterEcommerceRepository = () => {
  class RegisterEcommerceRepositorySpy {
    async register ({
      name,
      description,
      contactEmail,
      country
    }) {
      this.name = name
      this.description = description
      this.contactEmail = contactEmail
      this.country = country
      this.isActive = true
    }
  }

  const registerEcommerceRepositorySpy = new RegisterEcommerceRepositorySpy()

  console.log(registerEcommerceRepositorySpy)

  return registerEcommerceRepositorySpy
}

const makeRegisterEcommerceRepositoryWithError = () => {
  class RegisterEcommerceRepositorySpy {
    async register () {
      throw new Error()
    }
  }

  return new RegisterEcommerceRepositorySpy()
}

describe('Register Ecommerce UseCase', () => {
  test('Should throw if no name is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.register()
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('Should throw if no description is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.register('valid_name')
    expect(promise).rejects.toThrow(new MissingParamError('description'))
  })

  test('Should throw if no contactEmail is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.register('valid_name', 'valid_description')
    expect(promise).rejects.toThrow(new MissingParamError('contactEmail'))
  })

  test('Should throw if no country is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.register('valid_name', 'valid_description', 'valid_contact_email')
    expect(promise).rejects.toThrow(new MissingParamError('country'))
  })

  test('Should call RegisterEcommerceRepository with correct parameters', async () => {
    const { sut, registerEcommerceRepositorySpy } = makeSut()

    await sut.register('valid_name', 'valid_description', 'valid_email', 'valid_country')

    expect(registerEcommerceRepositorySpy.name).toBe('valid_name')
    expect(registerEcommerceRepositorySpy.description).toBe('valid_description')
    expect(registerEcommerceRepositorySpy.contactEmail).toBe('valid_email')
    expect(registerEcommerceRepositorySpy.country).toBe('valid_country')
    expect(registerEcommerceRepositorySpy.isActive).toBe(true)
  })

  test('Should throw if no RegisterEcommerceRepository is provided', async () => {
    const sut = new RegisterEcommerceUseCase()
    const promise = sut.register('valid_name', 'valid_description', 'valid_email', 'valid_country')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if RegisterEcommerceRepository throws', async () => {
    const sut = new RegisterEcommerceUseCase({
      registerEcommerceRepository: makeRegisterEcommerceRepositoryWithError()
    })
    const promise = sut.register('valid_name', 'valid_description', 'valid_email', 'valid_country')
    expect(promise).rejects.toThrow()
  })
})
