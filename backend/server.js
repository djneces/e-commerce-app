import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import orderRouter from './routers/orderRouter.js'

dotenv.config()

const app = express()
app.use(express.json()) //new middleware parsing JSON in the body of request
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    //get rid off duplicated warning
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

//mongodb 
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/', (req, res) => {
    res.send('server is ready')
})

//middleware - error catcher - when we had duplicated key error collection
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000
app.listen(port, ()=> {
console.log(`Serve at localhost: ${port}`);
})