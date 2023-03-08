import express from 'express'
import morgan from 'morgan'
import path from 'path'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import shopRoutes from './routes/shopRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import keys from './keys.js'


connectDB()

const app = express()

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'))
}

app.use(express.json());


app.use('/api/products', shopRoutes)

app.use('/api/users', authRoutes)

app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(keys.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//serve static assests for production
if (keys.NODE_ENV === 'production') {
  
  //set static folder
  app.use(express.static(path.join(__dirname,'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = keys.PORT || 5000

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));