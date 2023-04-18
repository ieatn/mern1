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
            console.log('listening to port 4000')
        })
    })

// now have access to table 
const Todo = require('./models/TodoModel')

app.get('/', async (req, res) => {
    // res.json({msg: 'get'})
    const todos = await Todo.find()
    res.json(todos)
})

// destructured variable has to be same as json input from frontend
app.post('/', async (req, res) => {
    // const {name} = req.body
    // res.json(name)
    const {title} = req.body
    const todo = await Todo.create({title})
    res.json(todo)
})

app.put('/:id', async (req, res) => {
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

app.delete('/:id', async (req, res) => {
    // res.json({msg: 'deleted'})
    const {id} = req.params
    const todo = await Todo.findByIdAndDelete(id)
    res.json(todo)
})

// users

const User = require('./models/UserModel')

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.login(username, password)
        res.status(200).json({user})
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
        res.status(200).json({user})
    } catch (err) {
        res.status(400).json({err:  err.message})
    }
})