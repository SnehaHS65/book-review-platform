import { useParams } from 'react-router-dom'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import { CREATE_REVIEW } from '../graphql/mutations'

// Query to get book by ID
const GET_BOOK_BY_ID = gql`
  query GetBook($id: ID!) {
    getBookById(id: $id) {
      id
      title
      author
      description
      reviews {
        content
        rating
        user {
          username
        }
      }
    }
  }
`

const BookDetailPage = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id },
  })

  const [content, setContent] = useState('')
  const [rating, setRating] = useState(5)

  const [createReview] = useMutation(CREATE_REVIEW, {
    refetchQueries: ['GetBook'],
  })

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (!user) {
    alert('Please log in to submit a review.')
    return
  }

  try {
    await createReview({
      variables: {
        userId: Number(user.id),   // ✅ this is what fixes your error
        bookId: Number(id),
        content,
        rating: Number(rating),
      },
    })
    setContent('')
    setRating(5)
  } catch (err) {
    console.error('Review creation failed:', err)
  }
}


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const book = data.getBookById

  return (
    <div>
      <h1>{book.title}</h1>
      <h3>by {book.author}</h3>
      <p>{book.description}</p>

      <h2>Reviews</h2>
      {book.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {book.reviews.map((r: any, idx: number) => (
            <li key={idx}>
              <strong>{r.user.username}</strong>: {r.content} ({r.rating}/5)
            </li>
          ))}
        </ul>
      )}

      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review..."
          required
        ></textarea>
        <br />
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  )
}

export default BookDetailPage
