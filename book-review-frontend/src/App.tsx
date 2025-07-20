import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import BookDetailPage from './pages/BookDetailPage'
import AdminPage from './pages/AdminPage'

const user = JSON.parse(localStorage.getItem('user') || 'null')

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/book/:id"
        element={user ? <BookDetailPage /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}

export default App
