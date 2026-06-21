import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: '秒启视界', subtitle: '微信视频小程序',
    desc: '基于 uni-app 开发的微信视频小程序，汇聚海量视频资源，涵盖搞笑、科普、生活、影视等主题。采用分包加载与骨架屏优化技术，首屏时间优化 30%+。',
    role: '核心开发', achievement: '代码复用率 85%+',
    tech: ['uni-app', 'Vue2', '微信小程序', 'uView UI', 'HBuilderX'],
    link: 'https://www.pgyer.com/qMVhHtrZ',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', accent: '#7c5cbf',
  },
  {
    title: '手机商城 APP', subtitle: '跨平台电商应用',
    desc: '基于 uni-app 的跨平台商城应用，支持 Android/iOS/H5 多端。实现商品展示、购物车管理、下单支付全流程，采用 Vuex 状态管理与 Axios 接口封装。',
    role: '前端开发', achievement: '首屏速度提升 30%+',
    tech: ['uni-app', 'Vue2', 'Vuex', 'Axios', '微信支付'],
    link: 'https://www.pgyer.com/UsFSaiJc',
    gradient: 'linear-gradient(135deg, #0d0d0d, #1a1a2e, #16213e)', accent: '#4a90d9',
  },
]

const projectStats = [
  { n: '2', l: '上线项目' },
  { n: '2', l: '技术栈掌握' },
  { n: '85%+', l: '最高复用率' },
  { n: '30%+', l: '性能优化幅度' },
]

export default function ProjectsPage() {
  const sRef = useRef(null); const tRef = useRef(null); const cardsRef = useRef([])
  const psRef = useRef(null); const psItemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(tRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      cardsRef.current.forEach((c,i)=>{ gsap.fromTo(c,{y:60,opacity:0},{y:0,opacity:1,duration:0.8,ease:'power3.out',delay:0.3+i*0.2}) })
      ScrollTrigger.create({ trigger: psRef.current, start: 'top 85%', onEnter: () => { psItemsRef.current.forEach((c,i)=>{gsap.fromTo(c,{y:30,opacity:0},{y:0,opacity:1,duration:0.5,ease:'power3.out',delay:i*0.1})}) }, once: true })
    }); return () => ctx.revert()
  }, [])

  return (
    <div ref={sRef}>
      <section style={{ minHeight:'calc(100vh - 72px)',display:'flex',alignItems:'center',background:'var(--bg-primary)',padding:'80px 0' }}>
        <div className="container" style={{ width:'100%' }}>
          <div ref={tRef} style={{ textAlign:'center',marginBottom:'64px' }}>
            <div style={{ display:'inline-block',padding:'4px 12px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',letterSpacing:'1px',marginBottom:'16px' }}>精选项目</div>
            <h2 style={{ fontSize:'36px',fontWeight:'600',color:'#f0f0f0' }}>代表性<span style={{ color:'#a29bfe' }}>作品</span></h2>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:'40px' }}>
            {projects.map((p,i)=>(
              <div key={p.title} ref={el=>cardsRef.current[i]=el} style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",borderRadius:"20px",overflow:"hidden",background:"var(--bg-card)",border:"1px solid rgba(255,255,255,0.04)",transition:"all 0.4s ease",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(108,92,231,0.15)";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 24px 48px rgba(0,0,0,0.3)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.04)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
                <div style={{ minHeight:'380px',background:p.gradient,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden' }}>
                  <div style={{ position:'absolute',inset:0,background:`radial-gradient(circle at 50% 50%, ${p.accent}22, transparent 70%)` }} />
                  <div style={{ fontSize:'64px',fontWeight:'700',color:'rgba(255,255,255,0.08)',letterSpacing:'8px',userSelect:'none',zIndex:1 }}>{p.title}</div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ position:'absolute',bottom:'24px',left:'24px',display:'flex',alignItems:'center',gap:'8px',padding:'10px 20px',background:'rgba(0,0,0,0.4)',backdropFilter:'blur(8px)',borderRadius:'10px',color:'#fff',fontSize:'13px',fontWeight:'500',textDecoration:'none',zIndex:2,transition:'background 0.3s ease' }}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(108,92,231,0.6)'}
                    onMouseLeave={e=>e.currentTarget.style.background='rgba(0,0,0,0.4)'}
                  ><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>演示地址</a>
                </div>
                <div style={{ padding:'40px',display:'flex',flexDirection:'column',justifyContent:'center' }}>
                  <div style={{ fontSize:'12px',color:p.accent,fontWeight:'600',letterSpacing:'1px',marginBottom:'8px' }}>{p.subtitle}</div>
                  <h3 style={{ fontSize:'28px',fontWeight:'600',color:'#f0f0f0',marginBottom:'16px' }}>{p.title}</h3>
                  <p style={{ fontSize:'14px',color:'#a0a0a0',lineHeight:'1.8',marginBottom:'20px' }}>{p.desc}</p>
                  <div style={{ display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'20px' }}>
                    {p.tech.map(t=>(
                      <span key={t} style={{ padding:'4px 12px',background:'rgba(255,255,255,0.04)',borderRadius:'6px',fontSize:'12px',color:'#888',border:'1px solid rgba(255,255,255,0.06)' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display:'flex',gap:'12px',flexWrap:'wrap' }}>
                    <div style={{ display:'flex',alignItems:'center',gap:'6px',padding:'6px 14px',background:'rgba(255,255,255,0.04)',borderRadius:'8px',fontSize:'12px',color:'#a0a0a0' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>{p.role}
                    </div>
                    <div style={{ display:'flex',alignItems:'center',gap:'6px',padding:'6px 14px',background:'rgba(108,92,231,0.08)',borderRadius:'8px',fontSize:'12px',color:'#a29bfe' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>{p.achievement}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={psRef} style={{ padding:'80px 0',background:'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:'48px' }}>
            <div style={{ display:'inline-block',padding:'4px 12px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',letterSpacing:'1px',marginBottom:'16px' }}>项目数据</div>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'24px' }}>
            {projectStats.map((st,i)=>(
              <div key={st.l} ref={el=>psItemsRef.current[i]=el} style={{ padding:'36px 24px',textAlign:'center',background:'rgba(255,255,255,0.02)',borderRadius:'16px',border:'1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize:'44px',fontWeight:'700',background:'linear-gradient(135deg,#6c5ce7,#a29bfe)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'8px' }}>{st.n}</div>
                <div style={{ fontSize:'14px',color:'#888' }}>{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}