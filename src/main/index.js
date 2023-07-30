const express = require('express')
const app = express()
const PORT = 5858

app.listen(PORT, () => console.info(`Server running on port: ${PORT}`))
