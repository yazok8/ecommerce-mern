import express from 'express'
import morgan from "morgan"
import path from 'path'
import connectDB from './config/db.js'
import colors from 'colors'
import authRoutes from './routes/authRoutes.js'
import shopRoutes from './routes/shopRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
// import { notFound, errorHandler } from './middlewares/errorMiddleware.js'


connectDB()

const app = express()

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'))
}

app.use(express.json({ extended: false }));

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/api/products', shopRoutes)

app.use('/api/users', authRoutes)

app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

//serve static assests for production
if (process.env.NODE_ENV === 'production') {
  
  //set static folder
  app.use(express.static('/client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}else{
  app.get('/', (req, res)=>{
    res.send('API is running')
  })
}

// //Error NotFound

// app.use(notFound)

// app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));