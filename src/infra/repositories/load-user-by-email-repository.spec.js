class LoadUserByEmailRepository {
  async load () {
    return null
  }
}

describe('LoadUserByEmail Repository', () => {
  test('Should return null if no user is found', async () => {
    const sut = new LoadUserByEmailRepository()
    const user = await sut.load('invalid_email')
    expect(user).toBeNull()
  })
})
