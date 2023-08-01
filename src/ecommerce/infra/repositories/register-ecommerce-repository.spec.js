const { MissingParamError } = require('../../../utils/errors')
const MongoHelper = require('../../../utils/helpers/mongo-helper')
const RegisterEcommerceRepository = require('./register-ecommerce-repository')
let ecommerceModel

const makeSut = () => {
  return new RegisterEcommerceRepository()
}

describe('RegisterEcommerce Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    ecommerceModel = await MongoHelper.getCollection('ecommerces')
  })

  beforeEach(async () => {
    await ecommerceModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should insert a new ecommerce with correct data', async () => {
    const sut = makeSut()
    const ecommerceData = {
      name: 'valid_name',
      description: 'valid_description',
      contactEmail: 'valid_email',
      country: 'valid_country',
      isActive: true
    }

    await sut.register(ecommerceData)

    const savedEcommerce = await ecommerceModel.findOne({ name: 'valid_name' })
    expect(savedEcommerce).toBeTruthy()
    expect(savedEcommerce.name).toBe('valid_name')
    expect(savedEcommerce.description).toBe('valid_description')
    expect(savedEcommerce.contactEmail).toBe('valid_email')
    expect(savedEcommerce.country).toBe('valid_country')
    expect(savedEcommerce.isActive).toBe(true)
  })

  test('Should throw if no name is provided', () => {
    const sut = makeSut()
    const promise = sut.register({})
    expect(promise).rejects.toThrow(new MissingParamError('name'))
  })
})
