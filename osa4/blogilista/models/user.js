const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true, minlength: 3},
    name: String,
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })
userSchema.plugin(uniqueValidator, {message: 'Usernames must be unique'})
  const User = mongoose.model('User', userSchema)
  
  module.exports = User