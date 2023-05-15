import express, { json } from "express"
import cors from 'cors'
import router from './routes/indexRouter.js'
import dotenv from 'dotenv'
dotenv.config();

const server = express()
server.use(cors())
server.use(json())

server.use(router)

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Listening on ${port}`)
})