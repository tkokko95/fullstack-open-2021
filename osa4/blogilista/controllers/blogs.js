const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user')
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    if(!body.title || !body.url) {
      return response.status(400).end()
    }
    try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (request.token === undefined || decodedToken.id === undefined) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const user = request.user
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const blogObject = new Blog(blog)
  
    const result = await blogObject.save()
    user.blogs = user.blogs.concat(result.id)
    await user.save()
    response.status(201).json(result)
  }
  catch(exception){
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (request.token === undefined || decodedToken.id === undefined) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    const user = request.user
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)

      const updatedBlogs = user.blogs.filter(id => id != request.params.id)
      user.blogs = updatedBlogs
      await user.save()

      response.status(204).end()
    }
    else {
      response.status(403).json({error: 'user not authorized for this operation'})
    }

  } 
  catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body

    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

  
    await Blog.findByIdAndUpdate(request.params.id, newBlog)
    response.json(newBlog)
  } 
  catch(exception) {
    next(exception)
  }
})

  module.exports = blogsRouter