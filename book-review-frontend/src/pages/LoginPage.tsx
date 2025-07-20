import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_USER_BY_EMAIL_AND_PASSWORD } from '../graphql/queries'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER_BY_EMAIL_AND_PASSWORD)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await getUser({ variables: { email, password } })
  }

  useEffect(() => {
    const user = data?.getUserByEmailAndPassword
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      user.role === 'ADMIN' ? navigate('/admin') : navigate('/')
    }
  }, [data, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Feedback */}
        {loading && <p className="text-blue-600 text-center mt-3">Logging in...</p>}
        {error && <p className="text-red-600 text-center mt-3">Error: {error.message}</p>}
        {data && !data.getUserByEmailAndPassword && (
          <p className="text-red-600 text-center mt-3">Invalid email or password</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
