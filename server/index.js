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
const isLoggedIn = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({error: 'you forgot token in authorization header'})
    }
    const token = authorization.split(' ')[1]
    // find a user in this database by token
    try {
        // token is undefined and user is null bug
        const {_id} = verifyToken(token)
        console.log(_id)
        // store user id in req object so all routes can use req
        req.user = await User.findOne({_id}).select('_id')
        console.log('user: ', req.user)
        req._id = 3
        next()
    } catch (err) {   
        res.status(401).json({ error: 'request is not authorized' })    
    }
}

// ROUTES
// using express router means you dont need to add isloggedin into every route, less work, but need routes and controllers
app.get('/', isLoggedIn, async (req, res) => {
    // find and fetch all todos only by user_id from current logged in user
    const user_id = req._id
    const todos = await Todo.find({user_id})
    res.json(todos)
})

// destructured variable has to be same as json input from frontend
app.post('/', isLoggedIn, async (req, res) => {
    const {title} = req.body
    const user_id = req._id
    const todo = await Todo.create({title, user_id})
    res.json(todo)
})

app.put('/:id', isLoggedIn, async (req, res) => {
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

app.get('/protected-route', isLoggedIn, async (req, res) => {
    const secret = {message: 'logged in with token'}
    res.send(secret)
})


