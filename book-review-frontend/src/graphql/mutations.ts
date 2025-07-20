import { gql } from '@apollo/client'

export const CREATE_REVIEW = gql`
  mutation CreateReview($userId: ID!, $bookId: ID!, $content: String!, $rating: Int!) {
    createReview(userId: $userId, bookId: $bookId, content: $content, rating: $rating) {
      id
      content
      rating
    }
  }
`
export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
      role
    }
  }
`
export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $description: String!) {
    createBook(title: $title, author: $author, description: $description) {
      id
      title
      author
      description
    }
  }
`