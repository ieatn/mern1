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

const todoRoutes = require('./routes/todoRoutes')
app.use('/api/todos', todoRoutes)

const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes) 

app.get('/', (req, res) => {
    res.send('hello world')
})
