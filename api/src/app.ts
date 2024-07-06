import express from 'express'
import routes from './routes'
const cors = require('cors')

const app = express()

app.use(cors())

app.use(routes)

export default app
