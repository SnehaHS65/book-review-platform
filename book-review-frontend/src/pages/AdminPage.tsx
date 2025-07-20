import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_BOOK } from '../graphql/mutations'
import { GET_ALL_BOOKS } from '../graphql/queries'

const AdminPage = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')

  const [createBook] = useMutation(CREATE_BOOK, {
  refetchQueries: [{ query: GET_ALL_BOOKS }],
})


  const { data, loading, error } = useQuery(GET_ALL_BOOKS)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createBook({ variables: { title, author, description } })
      setTitle('')
      setAuthor('')
      setDescription('')
    } catch (err) {
      console.error('Error creating book:', err)
    }
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea><br />
        <button type="submit">Add Book</button>
      </form>

      <h2>All Books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {data.getAllBooks.map((book: any) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}<br />
              <em>{book.description}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AdminPage
