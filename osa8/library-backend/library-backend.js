const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./gql/typedefs')
const { resolvers } = require('./gql/resolvers')

const mongoose = require('mongoose')

require('doten').config()

const url = process.env.MONGODB_URI


mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err.message)
    })

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
