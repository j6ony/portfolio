import { useState } from 'react'
import Particles from '../components/Particles';

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(ellipse at 50% 0%, #1a1a2e, #0a0a0a 70%)',
    position: 'relative',
    overflow: 'hidden',
  },

  card: {
    width: '440px',
    padding: '56px 44px',
    background: 'rgba(10,10,10,0.35)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 12px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(108,92,231,0.12)',
    position: 'relative',
    zIndex: 1,
  },
  logo: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0 auto 24px',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: '600',
    color: '#f0f0f0',
    marginBottom: '8px',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    marginBottom: '32px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    color: '#a0a0a0',
    marginBottom: '8px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '12px',
    color: '#f0f0f0',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  inputFocus: {
    borderColor: '#6c5ce7',
    boxShadow: '0 0 0 3px rgba(108,92,231,0.15)',
  },
  btnPrimary: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '8px',
  },
  toggleText: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#666',
  },
  toggleLink: {
    color: '#a29bfe',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    marginLeft: '4px',
  },
  error: {
    textAlign: 'center',
    color: '#ff6b6b',
    fontSize: '13px',
    marginBottom: '16px',
    padding: '10px',
    background: 'rgba(255,107,107,0.1)',
    borderRadius: '8px',
  },
  success: {
    textAlign: 'center',
    color: '#51cf66',
    fontSize: '13px',
    marginBottom: '16px',
    padding: '10px',
    background: 'rgba(81,207,102,0.1)',
    borderRadius: '8px',
  },
}

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.username.trim() || !form.password.trim()) {
      setError('请填写完整信息')
      return
    }

    if (isRegister) {
      if (form.password.length < 4) {
        setError('密码至少4位')
        return
      }
      if (form.password !== form.confirmPassword) {
        setError('两次密码不一致')
        return
      }
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.find(u => u.username === form.username)) {
        setError('用户名已存在')
        return
      }
      users.push({ username: form.username, password: form.password })
      localStorage.setItem('users', JSON.stringify(users))
      setSuccess('注册成功，请登录')
      setIsRegister(false)
      setForm({ username: '', password: '', confirmPassword: '' })
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.username === form.username && u.password === form.password)
      if (user) {
        onLogin({ username: form.username })
      } else {
        setError('用户名或密码错误')
      }
    }
  }

  const toggleMode = () => {
    setIsRegister(!isRegister)
    setError('')
    setSuccess('')
    setForm({ username: '', password: '', confirmPassword: '' })
  }

  return (
    <div style={styles.wrapper}>
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <Particles
          particleColors={['#6c5ce7', '#a29bfe', '#fd79a8', '#ffffff']}
          particleCount={500}
          particleSpread={12}
          speed={0.06}
          particleBaseSize={250}
          alphaParticles={true}
          moveParticlesOnHover={true}
          cameraDistance={25}
          sizeRandomness={1}
          disableRotation={false}
        />
      </div>
      <div style={{ position:'absolute', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle at 50% 50%, rgba(108,92,231,0.1), transparent 70%)', pointerEvents:'none', zIndex:1 }} />
      <div style={styles.card}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(108,92,231,0.2)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
      >
        <div style={styles.logo}>D</div>
        <h1 style={styles.title}>{isRegister ? '创建账号' : '欢迎回来'}</h1>
        <p style={styles.subtitle}>{isRegister ? '注册后即可浏览作品集' : '登录以进入个人主页'}</p>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>用户名</label>
            <input
              style={{
                ...styles.input,
                ...(focusedField === 'username' ? styles.inputFocus : {}),
              }}
              type="text"
              placeholder="输入用户名"
              value={form.username}
              onChange={handleChange('username')}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>密码</label>
            <input
              style={{
                ...styles.input,
                ...(focusedField === 'password' ? styles.inputFocus : {}),
              }}
              type="password"
              placeholder="输入密码"
              value={form.password}
              onChange={handleChange('password')}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          {isRegister && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>确认密码</label>
              <input
                style={{
                  ...styles.input,
                  ...(focusedField === 'confirm' ? styles.inputFocus : {}),
                }}
                type="password"
                placeholder="再次输入密码"
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                onFocus={() => setFocusedField('confirm')}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          )}

          <button
            type="submit"
            style={styles.btnPrimary}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(108,92,231,0.35)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {isRegister ? '注册' : '登录'}
          </button>
        </form>

        <div style={styles.toggleText}>
          {isRegister ? '已有账号？' : '还没有账号？'}
          <button style={styles.toggleLink} onClick={toggleMode}>
            {isRegister ? '去登录' : '立即注册'}
          </button>
        </div>
      </div>
    </div>
  )
}
