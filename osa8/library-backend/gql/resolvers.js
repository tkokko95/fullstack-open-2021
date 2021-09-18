const Book = require('../models/book');
const Author = require('../models/author');

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            return await Book.find({})
        },
        allAuthors: async () => {
            return await Author.find({})
        }
    },

    Mutation: {
        addBook: (root, args) => {
            const book = { ...args, id:uuid() }
            books = books.concat(book)

            if(authors.filter(author => author.name === args.author).length === 0) {
                authors = authors.concat(
                    {
                        name: args.author,
                        born: null,
                        id: uuid()
                    }
                )
            }
            return(book)
        }
        /*
        editAuthor: (root, args) => {
            const authorToEdit = authors.find(author => author.name === args.name)
            if(!authorToEdit) {
                return null
            }
            const updatedAuthor = 
            {
                ...authorToEdit,
                born: args.setBornTo

            }
            authors = authors.map(author => author.name === updatedAuthor.name ? updatedAuthor : author)
            return(updatedAuthor)
        }
        */
    }
}

module.exports = {resolvers}