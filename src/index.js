import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import cors from 'cors'
import router from './routes/index'

dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.json())
mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB, { useMongoClient: true })

router(app)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8080, () => console.log('Running on port 8080'))
