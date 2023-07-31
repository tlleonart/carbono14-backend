const { MissingParamError } = require('../../../utils/errors')
const RegisterEcommerceUseCase = require('./register-ecommerce-usecase')

const makeSut = () => {
  const sut = new RegisterEcommerceUseCase()

  return {
    sut
  }
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
})
