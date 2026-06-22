import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import ContactPage from './pages/ContactPage'

function App() {
  const handleLogout = () => {
    localStorage.removeItem('auth_user')
  }

  return (
      <Routes>
        <Route path="/" element={<Layout onLogout={handleLogout}><HomePage /></Layout>} />
        <Route path="/about" element={<Layout onLogout={handleLogout}><AboutPage /></Layout>} />
        <Route path="/projects" element={<Layout onLogout={handleLogout}><ProjectsPage /></Layout>} />
        <Route path="/skills" element={<Layout onLogout={handleLogout}><SkillsPage /></Layout>} />
        <Route path="/contact" element={<Layout onLogout={handleLogout}><ContactPage /></Layout>} />
      </Routes>
  )
}

export default App
