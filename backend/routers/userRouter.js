import express from 'express';
import expressAsyncHandler from 'express-async-handler';
//needed data.js - or error
import data from '../data.js';
import User from '../models/userModel.js';

const userRouter = express.Router()

//express async handler - to resolve duplicate key error collection issue

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.remove({})//removes all users, so we dont have duplicates, it creates them again down there, should be commented out

    const createdUsers = await User.insertMany(data.users)
    res.send({
        createdUsers
    })
}))
export default userRouter