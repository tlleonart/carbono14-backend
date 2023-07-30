const { UnauthorizedError } = require('../../../auth/presentation/errors')
const { MissingParamError } = require('../../../utils/errors')
const RegisterEcommerceRouter = require('./register-ecommerce-router')

const makeSut = () => {
  const sut = new RegisterEcommerceRouter()

  return {
    sut
  }
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
})
