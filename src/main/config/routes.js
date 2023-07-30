const router = require('express').Router()
const fg = require('fast-glob')

module.exports = app => {
  app.use('/api', router)

  // Map all files inside routes folder, then dynamically imports routes.
  fg.sync('**/src/main/routes/**routes.js').forEach(file => require(`../../../${file}`)(router))
}
