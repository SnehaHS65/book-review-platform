import { gql } from 'apollo-server'

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String
    reviews: [Review!]!
    role: String!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    content: String!
    rating: Int!
    user: User!
    book: Book!
  }

  type Query {
    getAllBooks: [Book!]!
    getBookById(id: ID!): Book
    getReviewsByBookId(bookId: ID!): [Review!]!
    getUserByEmail(email: String!): User
    getUserByEmailAndPassword(email: String!, password: String!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!, role: String): User
    createBook(title: String!, author: String!, description: String): Book!
    createReview(userId: ID!, bookId: ID!, content: String!, rating: Int!): Review!
  }
`

export default typeDefs
