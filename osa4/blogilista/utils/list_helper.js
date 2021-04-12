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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}