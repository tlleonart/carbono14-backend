const MongoHelper = require('../helpers/mongo-helper')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    await this.userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}

describe('UpdateAcessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const userModel = db.collection('users')
    const sut = new UpdateAccessTokenRepository(userModel)

    const mockUser = { email: 'valid_email@mail.com', password: 'hashed_password' }
    await userModel.insertOne(mockUser)

    await sut.update(mockUser._id, 'valid_token')
    const updatedMockUser = await userModel.findOne({ _id: mockUser._id })

    expect(updatedMockUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const userModel = db.collection('users')

    const mockUser = { email: 'valid_email@mail.com', password: 'hashed_password' }
    await userModel.insertOne(mockUser)

    const promise = sut.update(mockUser._id, 'any_email@mail.com')

    expect(promise).rejects.toThrow()
  })
})
