const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')
    const PORT = 5858

    app.listen(PORT, () => console.info(`Server running on port: ${PORT}`))
  })
  .catch(console.error)
