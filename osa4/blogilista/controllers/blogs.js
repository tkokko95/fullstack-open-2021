const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('blogs')
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const user = await User.findById(body.userId)

    if(!body.title || !body.url) {
      return response.status(400).end()
    }

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
      })

    const blogObject = new Blog(blog)
  
    const result = await blogObject.save()
    response.status(201).json(result)
  }
  catch(exception){
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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