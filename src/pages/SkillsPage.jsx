import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ParticleCard } from '../components/MagicBento'

gsap.registerPlugin(ScrollTrigger)

const toolchain = [
  { name: 'VS Code', level: 90 }, { name: 'HBuilderX', level: 85 }, { name: '微信开发者工具', level: 85 },
  { name: 'Android Studio', level: 60 }, { name: 'Git', level: 75 }, { name: 'Axios', level: 80 },
]

const skillGroups = [
  {
    title: '前端开发', icon: 'code', skills: [
      { name: 'JavaScript (ES6+)', level: 80 }, { name: 'Vue.js (Vue2)', level: 85 }, { name: 'React', level: 60 },
      { name: 'uni-app', level: 85 }, { name: 'HTML5 / CSS3', level: 85 },
    ]
  },
  {
    title: 'UI / 设计', icon: 'design', skills: [
      { name: 'uView UI', level: 85 }, { name: '响应式设计', level: 80 }, { name: 'Flex 布局', level: 85 },
      { name: 'CSS 动画', level: 75 }, { name: '设计规范制定', level: 70 },
    ]
  },
  {
    title: '工具与平台', icon: 'tool', skills: [
      { name: 'VS Code', level: 90 }, { name: 'HBuilderX', level: 85 }, { name: '微信开发者工具', level: 85 },
      { name: 'Git 版本控制', level: 75 }, { name: 'Axios / RESTful API', level: 80 },
    ]
  },
  {
    title: '架构与优化', icon: 'arch', skills: [
      { name: 'Vuex 状态管理', level: 80 }, { name: '分包加载', level: 75 }, { name: '骨架屏', level: 70 },
      { name: '性能优化', level: 80 }, { name: '组件化开发', level: 85 },
    ]
  },
  {
    title: 'AI 与设计', icon: 'ai', skills: [
      { name: 'AI 辅助设计', level: 75 }, { name: 'Prompt 工程', level: 70 }, { name: '视觉创意', level: 80 },
      { name: '交互设计', level: 75 }, { name: '产品思维', level: 70 },
    ]
  },
  {
    title: '软技能', icon: 'people', skills: [
      { name: '团队协作', level: 85 }, { name: '项目管理', level: 80 }, { name: '跨部门沟通', level: 80 },
      { name: '活动策划', level: 85 }, { name: '问题解决', level: 80 },
    ]
  },
]

const icons = {
  code: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  design: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/></svg>,
  tool: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  arch: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  ai: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
  people: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
}

export default function SkillsPage() {
  const sRef = useRef(null); const tRef = useRef(null); const cardsRef = useRef([])
  const tcRef = useRef(null); const tcItemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(tRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      cardsRef.current.forEach((c,i)=>{ gsap.fromTo(c,{y:40,opacity:0},{y:0,opacity:1,duration:0.6,ease:'power3.out',delay:0.15+i*0.08}) })
      ScrollTrigger.create({ trigger: tcRef.current, start: 'top 80%', onEnter: () => { tcItemsRef.current.forEach((c,i)=>{gsap.fromTo(c,{y:20,opacity:0,scale:0.95},{y:0,opacity:1,scale:1,duration:0.5,ease:'power3.out',delay:i*0.06})}) }, once: true })
    }); return () => ctx.revert()
  }, [])

  const Bar = ({level}) => (
    <div style={{ width:'100%',height:'4px',background:'rgba(255,255,255,0.06)',borderRadius:'2px',overflow:'hidden' }}>
      <div style={{ width:`${level}%`,height:'100%',background:'linear-gradient(90deg,#6c5ce7,#a29bfe)',borderRadius:'2px',transition:'width 0.6s ease' }} />
    </div>
  )

  return (
    <div ref={sRef}>
      <section style={{ minHeight:'calc(100vh - 72px)',display:'flex',alignItems:'center',background:'var(--bg-secondary)',padding:'80px 0' }}>
        <div className="container" style={{ width:'100%' }}>
          <div ref={tRef} style={{ textAlign:'center',marginBottom:'64px' }}>
            <div style={{ display:'inline-block',padding:'4px 12px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',letterSpacing:'1px',marginBottom:'16px' }}>个人优势</div>
            <h2 style={{ fontSize:'36px',fontWeight:'600',color:'#f0f0f0' }}>我的<span style={{ color:'#a29bfe' }}>能力</span>栈</h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px' }}>
            {skillGroups.map((g,i)=>(
              <ParticleCard key={g.title} ref={el=>cardsRef.current[i]=el}
                className="magic-bento-card magic-bento-card--border-glow"
                style={{ padding:'32px',background:'var(--bg-card)',borderRadius:'16px',border:'1px solid rgba(255,255,255,0.04)' }}
                enableTilt={true} enableMagnetism={true} clickEffect={true}
                glowColor="108, 92, 231" particleCount={8}>
                <div style={{ width:'44px',height:'44px',borderRadius:'12px',background:'rgba(108,92,231,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'#a29bfe',marginBottom:'20px' }}>{icons[g.icon]}</div>
                <h3 style={{ fontSize:'18px',fontWeight:'600',color:'#f0f0f0',marginBottom:'16px' }}>{g.title}</h3>
                <div style={{ display:'flex',flexDirection:'column',gap:'12px' }}>
                  {g.skills.map(s=>(
                    <div key={s.name}>
                      <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'4px' }}>
                        <span style={{ fontSize:'13px',color:'#888' }}>{s.name}</span>
                        <span style={{ fontSize:'12px',color:'#666' }}>{s.level}%</span>
                      </div>
                      <Bar level={s.level} />
                    </div>
                  ))}
                </div>
              </ParticleCard>
            ))}
          </div>
        </div>
      </section>
      <section ref={tcRef} style={{ padding:'100px 0',background:'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth:'900px' }}>
          <div style={{ textAlign:'center',marginBottom:'56px' }}>
            <div style={{ display:'inline-block',padding:'4px 12px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',letterSpacing:'1px',marginBottom:'16px' }}>工具链</div>
            <h2 style={{ fontSize:'32px',fontWeight:'600' }}>日常<span style={{ color:'#a29bfe' }}>工具</span></h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px' }}>
            {toolchain.map((t,i)=>(
              <div key={t.name} ref={el=>tcItemsRef.current[i]=el} style={{ padding:'24px',background:'var(--bg-card)',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'8px' }}>
                  <span style={{ fontSize:'14px',color:'#f0f0f0',fontWeight:'500' }}>{t.name}</span>
                  <span style={{ fontSize:'12px',color:'#a29bfe' }}>{t.level}%</span>
                </div>
                <div style={{ width:'100%',height:'4px',background:'rgba(255,255,255,0.06)',borderRadius:'2px',overflow:'hidden' }}>
                  <div style={{ width:`${t.level}%`,height:'100%',background:'linear-gradient(90deg,#6c5ce7,#a29bfe)',borderRadius:'2px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
