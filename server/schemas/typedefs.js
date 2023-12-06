const typedefs = `
type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User

}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeBook(bookId: ID!): User
    saveBook(authors: [String], description: String, title: String, bookId: ID, image: String, link: String): User
}`;

module.exports = typedefs;