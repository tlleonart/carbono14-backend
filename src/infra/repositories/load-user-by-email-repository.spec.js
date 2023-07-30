const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)

  return {
    userModel,
    sut
  }
}

describe('LoadUserByEmail Repository', () => {
  let client

  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await client.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await client.close()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invalid_email')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const { sut, userModel } = makeSut()
    const mockUser = { email: 'valid_email@mail.com', password: 'hashed_password' }
    await userModel.insertOne(mockUser)

    const insertedUser = await sut.load('valid_email@mail.com')

    expect(insertedUser).toEqual({
      _id: mockUser._id,
      password: mockUser.password
    })
  })
})
