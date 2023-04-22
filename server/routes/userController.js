const User = require('../models/UserModel')

const jwt = require('jsonwebtoken')

const createToken = (id) => {
    const token = jwt.sign({id}, process.env.SECRET)
    return token
}

const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      console.log(decoded)
      return decoded
    } catch (err) {
      throw new Error('Invalid token')
    }
}

const loginUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}

const registerUser = async (req, res) => {
    const {username, password} = req.body
    try {
        // delete all users in database
        // await User.deleteMany({})
        const user = await User.register(username, password)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}

module.exports = {registerUser, loginUser}