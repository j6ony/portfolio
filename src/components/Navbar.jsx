import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GooeyNav from './GooeyNav'

export default function Navbar({ onLogout }) {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { label: '首页', path: '/' },
    { label: '关于', path: '/about' },
    { label: '项目', path: '/projects' },
    { label: '优势', path: '/skills' },
    { label: '联系', path: '/contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: 'var(--nav-height)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div style={{
        width: '100%', maxWidth: 'var(--max-width)', padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontSize: '20px', fontWeight: '700',
          background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          cursor: 'pointer',
        }} onClick={() => navigate('/')}>
          D.AO
        </div>

        <GooeyNav
          items={navItems}
          particleCount={12}
          particleDistances={[70, 8]}
          particleR={80}
          animationTime={500}
          timeVariance={250}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          onLogout={onLogout}
        />
      </div>
    </nav>
  )
}
