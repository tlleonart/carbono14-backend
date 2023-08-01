const { MissingParamError } = require('../../../utils/errors')
const MongoHelper = require('../../../utils/helpers/mongo-helper')
const UpdateAccessTokenRepository = require('./update-access-token-repository')

let userModel

const makeSut = () => {
  return new UpdateAccessTokenRepository()
}

describe('UpdateAccessToken Repository', () => {
  let mockUserId

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()

    const mockUser = { email: 'valid_email@mail.com', password: 'hashed_password' }
    await userModel.insertOne(mockUser)

    mockUserId = mockUser._id
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const sut = makeSut()
    await sut.update(mockUserId, 'valid_token')
    const updatedMockUser = await userModel.findOne({ _id: mockUserId })

    expect(updatedMockUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(mockUserId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
