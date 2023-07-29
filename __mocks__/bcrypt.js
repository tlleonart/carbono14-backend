module.exports = {
  isValid: true,
  valud: '',
  hash: '',

  async compare (value, hash) {
    this.value = value
    this.hash = hash

    return this.isValid
  }
}
