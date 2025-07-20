import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [createUser, { loading, error }] = useMutation(CREATE_USER)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await createUser({
        variables: { username, email, password },
      })
      localStorage.setItem('user', JSON.stringify(data.createUser))
      navigate('/')
    } catch (err) {
      console.error('Signup error:', err)
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Signup failed. Try again.</p>}
    </div>
  )
}

export default SignupPage
