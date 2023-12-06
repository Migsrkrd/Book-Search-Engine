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
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
    
}

input BookInput {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput): User
    removeBook(bookId: ID!): User
}`;

module.exports = typedefs;