const cors = require('../middlewares/cors')
const express = require('express')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(express.json())
}
