import { gql } from '@apollo/client'

export const GET_ALL_BOOKS = gql`
  query {
    getAllBooks {
      id
      title
      author
      reviews {
        rating
      }
    }
  }
`
export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      username
      email
      role
    }
  }
`
export const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    getUserByEmailAndPassword(email: $email, password: $password) {
      id
      username
      email
      role
    }
  }
`

export const GET_USER_BY_EMAIL_AND_PASSWORD = gql`
  query GetUserByEmailAndPassword($email: String!, $password: String!) {
    getUserByEmailAndPassword(email: $email, password: $password) {
      id
      username
      email
      role
    }
  }
`
