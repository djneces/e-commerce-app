import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
//needed data.js - or error
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router()

//express async handler - to resolve duplicate key error collection issue

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.remove({})//removes all users, so we dont have duplicates, it creates them again down there, should be commented out

    const createdUsers = await User.insertMany(data.users)
    res.send({
        createdUsers
    })
}))

//post method to send data signing
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                //to authorize user
                token: generateToken(user)
            })
            return  //if not authorized, goes to next line to give 401
        }
    }
    res.status(401).send({message: 'Invalid email or password'})
}))

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),  //8 salt
    })
    const createdUser = await user.save()
    res.send(
        {
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            //to authorize createdUser
            token: generateToken(createdUser)
        }
    )
}))

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        res.send(user)
    } else {
        res.status(404).send({ message: 'User Not Found'})
    }
}))

export default userRouter

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res,) => {
    const user = await User.findById(req.user._id)
    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password= bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save()
        res.send({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
         token: generateToken(updatedUser)   
        })
    }
}))

