import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import ContactPage from './pages/ContactPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth_user') !== null
  })
  const handleLogin = (user) => {
    localStorage.setItem('auth_user', JSON.stringify(user))
    setIsAuthenticated(true)
  }
  const handleLogout = () => {
    localStorage.removeItem('auth_user')
    setIsAuthenticated(false)
  }
  return (
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
        <Route path="/" element={isAuthenticated ? <Layout onLogout={handleLogout}><HomePage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/about" element={isAuthenticated ? <Layout onLogout={handleLogout}><AboutPage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/projects" element={isAuthenticated ? <Layout onLogout={handleLogout}><ProjectsPage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/skills" element={isAuthenticated ? <Layout onLogout={handleLogout}><SkillsPage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/contact" element={isAuthenticated ? <Layout onLogout={handleLogout}><ContactPage /></Layout> : <Navigate to="/login" replace />} />
      </Routes>
  )
}
export default App
