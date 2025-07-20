import { useQuery } from '@apollo/client'
import { GET_ALL_BOOKS } from '../graphql/queries'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
  <div>
    <h1>📚 Book List</h1>
    <ul>
      {data.getAllBooks.map((book: any) => {
        const avgRating =
          book.reviews.length === 0
            ? 'No reviews yet'
            : (
                book.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
                book.reviews.length
              ).toFixed(1)

        return (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
              <h3>{book.title}</h3>
            </Link>
            <p>Author: {book.author}</p>
            <p>Avg Rating: {avgRating}</p>
          </li>
        )
      })}
    </ul>
  </div>
)

}

export default HomePage
