import Navbar from './Navbar'
import TargetCursor from './TargetCursor'

export default function Layout({ children, onLogout }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onLogout={onLogout} />
      <main style={{ flex: 1 }}>{children}</main>
      <TargetCursor hideDefaultCursor={false} spinDuration={2} parallaxOn={true} />
    </div>
  )
}
