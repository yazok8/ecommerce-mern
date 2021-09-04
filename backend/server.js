import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import authRoutes from './routes/authRoutes.js'
import shopRoutes from './routes/shopRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(express.json())

app.use('/api/products', shopRoutes)

app.use('/api/users', authRoutes)

app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

//Error NotFound

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
      .underline
  )
)
