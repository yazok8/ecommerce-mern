import dotenv from 'dotenv';
dotenv.config()

export default {
    PORT:process.env.PORT,
    MONGO_URI : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@zingvibesdb.0tkpd.mongodb.net/zingvibes-store?retryWrites=true&w=majority`,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD:process.env.MONGO_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET, 
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID
}