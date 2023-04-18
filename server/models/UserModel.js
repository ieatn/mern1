const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.statics.register = async function(username, password) {
    const exists = await this.findOne({ username });
    if (exists) {
        throw new Error('username taken');
    }
    const user = await this.create({ username, password });
}

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error('incorrect username');
    }
    const match = await user.password === password;
    if (!match) {
        throw new Error('incorrect password');
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);