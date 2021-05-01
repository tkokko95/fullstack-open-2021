const jwt = require('jsonwebtoken')
const { use } = require('../controllers/blogs')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError') {
      return response.status(403).json({error: error.message})
    }
    else if(error.name === 'ReferenceError') {
      return response.status(403).json({error: 'id doesn\'t exist'})
    }
    else if(error.name === 'CastError') {
      return response.status(400).json({error: 'malformed request'})
    }
    else if(error.name === 'JsonWebTokenError') {
      return response.status(401).json({error: 'invalid token'})
    }

    next(error)

}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  }
  next()

}

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    if(authorization && authorization.toLowerCase().startsWith('bearer')) {
      request.user = user
    }
    else {
      return response.status(401).json({error: 'invalid token'})
    }
  
  next()
  

}

module.exports = { errorHandler, tokenExtractor, userExtractor }