const PASSWORD = process.env.PASSWORD
const MONGO_URL = `mongodb+srv://testuser:${PASSWORD}@bloglist.jjofs.mongodb.net/bloglistdb?retryWrites=true&w=majority`
const PORT = 3003

module.exports = {MONGO_URL, PORT }