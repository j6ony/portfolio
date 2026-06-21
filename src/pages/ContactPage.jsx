import { useState, useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const sRef = useRef(null); const cRef = useRef(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focus, setFocus] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: cRef.current, start: 'top 80%', onEnter: () => { cRef.current.querySelectorAll('.ci').forEach((el,i)=>{gsap.fromTo(el,{y:30,opacity:0},{y:0,opacity:1,duration:0.6,stagger:0.08,ease:'power3.out',delay:i*0.05})}) }, once: true })
    }); return () => ctx.revert()
  }, [])

  const handleChange = (field) => (e) => {
    setForm(prev => ({...prev, [field]: e.target.value}))
    setError(''); setSubmitted(false)
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault(); setError(''); setSubmitted(false)
    if (!form.name.trim()) { setError('请输入联系人'); return }
    if (!form.phone.trim()) { setError('请输入联系电话'); return }
    if (!/^1\d{10}$/.test(form.phone.trim())) { setError('请输入正确的11位手机号'); return }
    if (!form.email.trim()) { setError('请输入电子邮件'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) { setError('邮箱格式不正确'); return }
    if (!form.message.trim()) { setError('请输入要求说明'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true); setForm({ name: '', phone: '', email: '', message: '' })
      } else {
        const err = data.error
        if (typeof err === 'string') setError(err)
        else setError(Object.values(err).filter(Boolean).join('；'))
      }
    } catch {
      setError('网络连接失败，请确认后端服务已启动')
    } finally {
      setLoading(false)
    }
  }, [form])

  const inputStyle = (field) => ({
    width: '100%',
    padding: '14px 16px 14px 44px',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focus === field ? 'rgba(108,92,231,0.4)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '12px',
    color: '#f0f0f0',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.25s ease',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    boxShadow: focus === field ? '0 0 0 3px rgba(108,92,231,0.12)' : 'none',
    opacity: loading ? 0.6 : 1,
  })

  const textareaStyle = (field) => ({
    ...inputStyle(field),
    resize: 'vertical',
    minHeight: '120px',
    padding: '14px 16px',
  })

  const iconMap = {
    name: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    phone: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    email: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  }

  const contactInfo = [
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: '邮箱', value: '2769074119@qq.com', href: 'mailto:2769074119@qq.com' },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: '电话', value: '18585943379', href: 'tel:18585943379' },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: '地区', value: '贵州省铜仁市碧江区' },
  ]

  return (
    <section ref={sRef} style={{
      minHeight: 'calc(100vh - 72px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 80%, #1a1a2e 0%, #0a0a0a 60%)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(108,92,231,0.04), transparent)', pointerEvents: 'none' }} />

      <div ref={cRef} style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '820px', padding: '80px 40px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="ci cursor-target" style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(108,92,231,0.1)', borderRadius: '6px', color: '#a29bfe', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', marginBottom: '16px' }}>联系方式</div>
          <h2 className="ci cursor-target" style={{ fontSize: 'clamp(32px,4vw,44px)', fontWeight: '700', marginBottom: '12px', lineHeight: '1.15' }}>期待与你<span style={{ color: '#a29bfe' }}>合作</span></h2>
          <p className="ci cursor-target" style={{ fontSize: '15px', color: '#666', maxWidth: '480px', margin: '0 auto', lineHeight: '1.8' }}>无论你想聊聊设计创意、探讨技术方案，还是有一个项目想要实现，我都非常乐意和你交流。</p>
        </div>

        {/* Contact Info Row */}
        <div className="ci cursor-target" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {contactInfo.map((item) => {
            const content = (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                padding: '20px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s ease',
                textDecoration: 'none', cursor: item.href ? 'pointer' : 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,92,231,0.2)'; e.currentTarget.style.background = 'rgba(108,92,231,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
              >
                <span style={{ color: '#a29bfe' }}>{item.icon}</span>
                <span style={{ fontSize: '11px', color: '#666', letterSpacing: '0.5px' }}>{item.label}</span>
                <span style={{ fontSize: '13px', color: '#c0c0c0', fontWeight: '500' }}>{item.value}</span>
              </div>
            )
            return item.href ? (
              <a key={item.label} href={item.href} style={{ textDecoration: 'none' }}>{content}</a>
            ) : (
              <div key={item.label}>{content}</div>
            )
          })}
        </div>

        {/* Form Card */}
        <div className="ci cursor-target" style={{
          background: 'rgba(255,255,255,0.02)', borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.06)', padding: '40px',
        }}>
          {submitted && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center',
              padding: '16px 20px', background: 'rgba(81,207,102,0.1)',
              border: '1px solid rgba(81,207,102,0.2)', borderRadius: '12px',
              color: '#51cf66', fontSize: '14px', marginBottom: '24px',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              感谢您的留言！我会尽快与您联系。
            </div>
          )}

          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 20px', background: 'rgba(255,107,107,0.1)',
              border: '1px solid rgba(255,107,107,0.2)', borderRadius: '12px',
              color: '#ff6b6b', fontSize: '14px', marginBottom: '24px',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Name & Phone row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: focus === 'name' ? '#a29bfe' : '#555', transition: 'color 0.25s ease', zIndex: 1, pointerEvents: 'none' }}>
                  {iconMap.name}
                </div>
                <input
                  placeholder="联系人 *" value={form.name} onChange={handleChange('name')}
                  disabled={loading} style={inputStyle('name')}
                  onFocus={() => setFocus('name')} onBlur={() => setFocus('')}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: focus === 'phone' ? '#a29bfe' : '#555', transition: 'color 0.25s ease', zIndex: 1, pointerEvents: 'none' }}>
                  {iconMap.phone}
                </div>
                <input
                  placeholder="联系电话 *" value={form.phone} onChange={handleChange('phone')}
                  disabled={loading} style={inputStyle('phone')}
                  onFocus={() => setFocus('phone')} onBlur={() => setFocus('')}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: focus === 'email' ? '#a29bfe' : '#555', transition: 'color 0.25s ease', zIndex: 1, pointerEvents: 'none' }}>
                {iconMap.email}
              </div>
              <input
                placeholder="电子邮件 *" value={form.email} onChange={handleChange('email')}
                disabled={loading} style={inputStyle('email')}
                onFocus={() => setFocus('email')} onBlur={() => setFocus('')}
              />
            </div>

            {/* Message */}
            <textarea
              placeholder="要求说明（请描述您的需求或合作意向）*" value={form.message} onChange={handleChange('message')}
              disabled={loading} style={textareaStyle('message')}
              onFocus={() => setFocus('message')} onBlur={() => setFocus('')}
            />

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              padding: '16px', background: loading ? 'rgba(108,92,231,0.5)' : 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
              border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px',
              fontWeight: '600', cursor: loading ? 'wait' : 'pointer',
              transition: 'all 0.3s ease', marginTop: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(108,92,231,0.35)' } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {loading && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              )}
              {loading ? '提交中...' : '提交留言'}
            </button>
          </form>
        </div>
        {/* Footer */}
        <div className="ci cursor-target" style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#333' }}>
            <span style={{ color: '#6c5ce7' }}>D.AO</span> &copy; 2026 王德芳
          </p>
        </div>
      </div>

      {/* Spin animation keyframes injected via style tag */}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </section>
  )
}
