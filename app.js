const express = require('express')
require('express-async-errors')
const app = express()
const todosRoutes = require('./routes/todos')
const authRoutes = require('./routes/auth')
const connectDB = require('./db/connect')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
require('dotenv').config()
const authenticateUser = require('./middleware/authentication')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xss())

app.get('/', (req, res) => {
  res.send('Todos App API')
})
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/todos', authenticateUser, todosRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
