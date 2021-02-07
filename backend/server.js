import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'

const app = express()
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    //get rid off duplicated warning
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

//mongodb 
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
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