const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initBlogs[1])
    await blogObject.save()

    await User.deleteMany({})
    const userObject = new User({
        username: 'dummy',
        name: 'dummy',
        password: 'dummy'
    })
    await userObject.save()



})

test('Notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
})

test('ID field is "id"', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('Can add blogs', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const initialBlogCount = initialBlogs.body.length

    const testBlog = {
        title: "dummy title",
        author: "dummy author",
        url: "dummy url",
        likes: 1337
    }

    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAfter = await api.get('/api/blogs')
    const blogCountAfter = blogsAfter.body.length
    expect(blogCountAfter).toBe(initialBlogCount + 1)

    const blogTitles = blogsAfter.body.map(blog => blog.title)
    expect(blogTitles).toContain(testBlog.title)
})

test('Likes set to 0 if unspecified', async () => {
    const testBlog = {
        title: "dummy title",
        author: "dummy author",
        url: "dummy url"
    }
    
    const response = await api
        .post('/api/blogs')
        .send(testBlog)

    expect(response.body.likes).toBe(0)
})

test('Missing/empty title or url fields rejected', async () => {
    const emptyFieldTestBlog = {
        title: '',
        author: 'dummy',
        url: ''
    }
    const missingFieldTestBlog = {
        author: 'dummy'
    }

    await api
        .post('/api/blogs')
        .send(emptyFieldTestBlog)
        .expect(400)
        
    await api
        .post('/api/blogs')
        .send(missingFieldTestBlog)
        .expect(400)
})

test('Not accepting usernames/passwords shorter than 3 characters', async () => {
    const shortUser = {
        username: 'sd',
        name: 'dummy',
        password: 'dummy'
    }
    await api
        .post('/api/users')
        .send(shortUser)
        .expect(403)
    
    const shortPassword = {
        username: 'dummy',
        name: 'dummy',
        password: 'as'
    }
    await api
        .post('/api/users')
        .send(shortPassword)
        .expect(403)
})

test ('Not accepting non-unique usernames', async () => {
    const newUser = {
        username: 'dummy',
        name: 'dummyname',
        password: 'asdf1234'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(403)
})



afterAll(() => {
    mongoose.connection.close()
})