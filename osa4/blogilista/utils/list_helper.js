const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
  return blogs.reduce((acc, current) => acc + current.likes, 0)

}

const favoriteBlog = (blogs) => {
  const mostPopular = blogs.reduce((prev, current) => {
    return (current.likes > prev.likes ? current : prev)
  })
  return mostPopular
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => ({author: blog.author, blogs: 0}))

  authors.forEach(author => {
    const blogsByAuthor = blogs.filter(blog => blog.author === author.author)
    author.blogs = blogsByAuthor.length
  })

  const authorWithMostBlogs = authors.reduce((prev, current) => {
    return (current.blogs > prev.blogs ? current : prev)
  })

  return authorWithMostBlogs
  
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => ({author: blog.author, likes: 0}))

  authors.forEach(author => {
    const blogsByAuthor = blogs.filter(blog => blog.author === author.author)
    author.likes = blogsByAuthor.reduce((acc, current) => acc + current.likes, 0)
  })

  const authorWithMostLikes = authors.reduce((prev,current) => {
    return(current.likes > prev.likes ? current : prev)
  })

  return authorWithMostLikes

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}