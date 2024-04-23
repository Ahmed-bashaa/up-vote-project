import express from 'express'
import userRouter from './src/modules/User/user.routes.js'
import ProductRouter from './src/modules/task/task .routes.js'
import db_connection from './DB/connection.js'
import { config } from 'dotenv'
import { globalResponse } from './src/middlewares/globalResponse.js'

config()
const app = express()
const port = process.env.port
app.use(express.json())
app.use(userRouter)
app.use(ProductRouter)
app.use('/uploads', express.static('src/uploads'))
app.use(globalResponse)
db_connection()

app.listen(port, () => console.log(`Example app listening on port (#_#) ${port}!`))
