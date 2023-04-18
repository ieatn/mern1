const mongoose = require('mongoose')

const Schema = mongoose.Schema
// make sure front end is passing in title prop as json
const TodoSchema = new Schema({
    title: {
        type: String,
    }
})

// creates a table in mern-workout database using the todo schema
module.exports = mongoose.model('Todo', TodoSchema)