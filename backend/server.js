import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import authRoutes from './routes/authRoutes.js'
import shopRoutes from './routes/shopRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use(express.json())

app.use('/api/shop', shopRoutes)

app.use('/api/users', authRoutes)

//Error NotFound

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, () =>
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
      .underline
  )
)
