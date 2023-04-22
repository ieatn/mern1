const Todo = require('../models/TodoModel');

const getTodos = async (req, res) => {
    // find and fetch all todos only by user_id from current logged in user
    try {
        const user_id = req.user._id
        const todos = await Todo.find({user_id})
        res.json(todos)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

const createTodo = async (req, res) => {
    try {
        const {title} = req.body
        const user_id = req.user._id
        const todo = await Todo.create({title, user_id})
        res.json(todo)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
};

const deleteTodo = async (req, res) => {
    const {id} = req.params
    const todo = await Todo.findByIdAndDelete(id)
    res.json(todo)
}

const updateTodo = async (req, res) => {
    const {id} = req.params
    const todo = await Todo.findById(id)
    todo.title = req.body.title
    if (req.body.completed !== undefined) {
        todo.completed = req.body.completed
    }
    await todo.save()
    res.json(todo)
}

const protectedRoute = async (req, res) => {
    const secret = {message: 'logged in with token'}
    res.send(secret)
}

module.exports = {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
    protectedRoute,
}
 