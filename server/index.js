const express = require('express')
const app = express()
app.use(express.json())

const dotenv = require('dotenv')
dotenv.config()


const cors = require('cors')
app.use(cors())


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to db')
        app.listen(process.env.PORT || 4000, () => {
            console.log('listening to port', process.env.PORT || 4000)
        })
    })
    .catch((err) => {
        console.log(err)
    })




// now have access to table 
const Todo = require('./models/TodoModel')


// middleware
// needs to be put above the routes before initialition error
const isLoggedIn = async (req, res, next) => {
    // throw error to remind instead of crashing the server
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({error: 'You forgot the header'})
    }
    // dont forget space for split
    const token = authorization.split(' ')[1]
    // const token = req.headers.authorization.split(' ')[1]
    // if (!token) {
    //     return res.status(401).json({error: 'Unauthorized: No token provided'})
    // }
    try {
        const {_id} = verifyToken(token)
        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (err) {   
        res.status(401).json({ error: 'Unauthorized: Invalid token' })    
    }
}

// ROUTES
// using express router means you dont need to add isloggedin into every route, less work, but need routes and controllers
app.get('/', isLoggedIn, async (req, res) => {
    // res.json({msg: 'get'})
    const todos = await Todo.find()
    res.json(todos)
})

// destructured variable has to be same as json input from frontend
app.post('/', isLoggedIn, async (req, res) => {
    // const {name} = req.body
    // res.json(name)
    const {title} = req.body
    const todo = await Todo.create({title})
    res.json(todo)
})

app.put('/:id', isLoggedIn, async (req, res) => {
    // res.json({msg: 'updated'})
    const {id} = req.params
    const todo = await Todo.findById(id)
    todo.title = req.body.title
    if (req.body.completed !== undefined) {
        todo.completed = req.body.completed
    }
    await todo.save()
    res.json(todo)
})

app.delete('/:id', isLoggedIn, async (req, res) => {
    // res.json({msg: 'deleted'})
    const {id} = req.params
    const todo = await Todo.findByIdAndDelete(id)
    res.json(todo)
})


// users

const User = require('./models/UserModel')

const jwt = require('jsonwebtoken')

const createToken = (id) => {
    const token = jwt.sign({id}, process.env.SECRET)
    return token
}

const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      return decoded
    } catch (err) {
      throw new Error('Invalid token')
    }
}

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    } catch (err) {
        res.status(400).json({err: err.message})
    }
})

app.post('/register', async (req, res) => {
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
})

// app.get('/protected-route', isLoggedIn, async (req, res) => {
//     res.json({msg:'SECRET MESSAGE MEANS YOU ARE LOGGED IN'})
// })
app.get('/protected-route', isLoggedIn, async (req, res) => {
    const secret = {message: 'logged in with token'}
    res.send(secret)
})


