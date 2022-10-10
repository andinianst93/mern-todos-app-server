const express = require('express')
const app = express()
const routes = require('./routes/todos')
const connectDB = require('./db/connect')
const cors = require('cors')

require('dotenv').config()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Todos App API')
})
app.use('/api/v1/todos', routes)

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
