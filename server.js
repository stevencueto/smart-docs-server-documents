require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const cors = require('cors')





app.use(cors())


const PORT = process.env.PORT || 3003;

// ___________________
// Database
// ___________________
const mongoURI = process.env.MONGO_URI

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true},
  () => console.log('MongoDB connection established:', mongoURI)
)



// Error / Disconnection
const db = mongoose.connection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected', mongoURI))

app.use(morgan('dev'))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//require router
const docsRouter = require('./controllers/DocumentController')
const microservicesRouter = require('./controllers/microServicesRouter')
const secureServer = require('./middleware/jwt')
app.use('/', secureServer)
app.use('/', docsRouter)
app.use('/micro', microservicesRouter)













app.listen(PORT, ()=>{
    console.log(`Listening on PORT: ${PORT}`)
})
