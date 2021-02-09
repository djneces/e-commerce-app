import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    //jason web token
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET || 'somethingsecret', //in production only env
    {
        expiresIn: '30d'
    }) 
}

//auth user middleware
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    if(authorization) {
        const token = authorization.slice(7, authorization.length) //bearer XXXXXXX, token part starts at [8]
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => { //jwt takes data from generateToken and puts them into decode
            if(err) {
                res.status(401).send({message: 'Invalid Token'})
            } else {
                req.user = decode
                next()
            }
        })
    } else {
        res.status(401).send({message: 'No Token'})     
    }
}