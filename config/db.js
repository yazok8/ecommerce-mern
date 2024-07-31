import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
};

const connectDB = async() => {
  mongoose.set('strictQuery', false);

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    
    console.log(`MongoDB is connected`)
  } catch (err) {
    console.log(`Error: ${err.message}`)
    //Exit process with failure
    process.exit(1)
  }
}

export default connectDB
