const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const isLoggedIn = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({error: 'you forgot token in authorization header'})
    }
    const token = authorization.split(' ')[1]
    try {
        const {id} = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({_id: id}).select('_id')
        if (!user) {
            return res.status(401).json({error: 'token wrong or user not found'})
        }
        req.user = await User.findOne({_id: id}).select('_id')
        next()
    } catch (err) {   
        res.status(401).json({ error: 'request is not authorized' })    
    }
}

module.exports = isLoggedIn