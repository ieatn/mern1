const express = require('express')
const { getTodos, createTodo, deleteTodo, updateTodo, protectedRoute } = require('./todoController')
const isLoggedIn = require('../middleware/isLoggedIn')
// pass in middleware to all routes using router.use
const router = express.Router()
router.use(isLoggedIn)

router.get('/', getTodos)
router.post('/', createTodo)
router.delete('/:id', deleteTodo)
router.put('/:id', updateTodo)

router.get('/protected-route', protectedRoute)

module.exports = router