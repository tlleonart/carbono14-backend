const app = require('./config/app')
const PORT = 5858

app.listen(PORT, () => console.info(`Server running on port: ${PORT}`))
