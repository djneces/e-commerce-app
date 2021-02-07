import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Product from '../models/productModel.js'


const productRouter = express.Router()

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}) //empty {} = all products 
    res.send(products)
}))

productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    await Product.remove({}) //removes products before loading for testing
    const createdProducts = await Product.insertMany(data.products) 
    res.send({ createdProducts })
}))

//at the end 
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id) //in URL by user
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'Product Not Found'})
    }
    
}))

export default productRouter