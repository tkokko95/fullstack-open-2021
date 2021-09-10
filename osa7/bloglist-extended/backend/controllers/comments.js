const commentsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id).populate('comments')
    response.json(blog)
})

commentsRouter.post('/:id/comments', async (request, response) => {
    const data = request.body
    const id = request.params.id

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(id)

    const comment = new Comment({
        comment: data.comment
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.status(201).json(savedComment)
})

module.exports = commentsRouter