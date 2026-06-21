import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hyperspeed from '../components/Hyperspeed'
import BorderGlow from '../components/BorderGlow'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { title: '视觉设计', desc: '品牌视觉识别、UI 界面设计、设计系统搭建，用美学驱动产品体验，让每一个像素都有意义。', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/></svg>' },
  { title: 'AI 交互设计', desc: '融合 AI 能力的产品交互方案，从 Prompt 工程到智能界面，创造更自然的人机交互体验。', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>' },
  { title: '前端开发', desc: '跨平台应用开发、响应式网页构建、性能优化，用技术将设计稿转化为流畅的数字产品。', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
]

const statsData = [
  { value: '8+', label: '完成项目' }, { value: '5', label: '获奖荣誉' },
  { value: '85%', label: '代码复用率' }, { value: '30%+', label: '性能提升' },
]

const hyperspeedOptions = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xFFFFFF,
    brokenLines: 0xFFFFFF,
    leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
    rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
    sticks: 0x03B3C3,
  }
}

export default function HomePage() {
  const heroRef = useRef(null)
  const heroTitleRef = useRef(null); const heroSubRef = useRef(null); const heroCtaRef = useRef(null)
  const brandRef = useRef(null); const servicesRef = useRef(null); const serviceCardsRef = useRef([])
  const statsRef = useRef(null); const statItemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroTitleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' })
      gsap.fromTo(heroSubRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo(heroCtaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 })
    }, heroRef); return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: brandRef.current, start: 'top 80%', onEnter: () => gsap.fromTo(brandRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }), once: true })
      ScrollTrigger.create({ trigger: servicesRef.current, start: 'top 80%', onEnter: () => { const el = servicesRef.current.querySelector('.s-label'); if(el) gsap.fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }); serviceCardsRef.current.forEach((c,i)=>{gsap.fromTo(c,{y:40,opacity:0},{y:0,opacity:1,duration:0.6,ease:'power3.out',delay:0.15+i*0.1})}) }, once: true })
      ScrollTrigger.create({ trigger: statsRef.current, start: 'top 85%', onEnter: () => { statItemsRef.current.forEach((c,i)=>{gsap.fromTo(c,{y:30,opacity:0},{y:0,opacity:1,duration:0.5,ease:'power3.out',delay:i*0.08})}) }, once: true })
    }); return () => ctx.revert()
  }, [])

  return (
    <div>
      <section ref={heroRef} style={{ height:'calc(100vh - 72px)',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',position:'relative',background:'#000' }}>
        <Hyperspeed effectOptions={hyperspeedOptions} />
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 70% 80%, rgba(108,92,231,0.08), transparent 50%)',zIndex:2,pointerEvents:'none' }} />
        <div style={{ position:'relative',zIndex:3,textAlign:'center',maxWidth:'900px',padding:'0 40px' }}>
          <div style={{ display:'inline-block',padding:'6px 16px',background:'rgba(108,92,231,0.12)',border:'1px solid rgba(108,92,231,0.2)',borderRadius:'20px',color:'#a29bfe',fontSize:'13px',fontWeight:'500',marginBottom:'24px',letterSpacing:'0.5px' }}>视觉设计师 / AI 设计师</div>
          <h1 ref={heroTitleRef} style={{ fontSize:'clamp(48px,7vw,96px)',fontWeight:'700',lineHeight:'1.1',marginBottom:'20px',letterSpacing:'-2px' }}>王德芳</h1>
          <div style={{ fontSize:'clamp(42px,5vw,72px)',fontWeight:'200',lineHeight:'1.2',color:'var(--text-secondary)',marginBottom:'24px',letterSpacing:'-1px' }}>创造<span style={{ color:'#a29bfe',fontWeight:'400' }}>有温度</span>的数字体验</div>
          <p ref={heroSubRef} style={{ fontSize:'16px',color:'#666',maxWidth:'600px',margin:'0 auto 40px',lineHeight:'1.8' }}>专注于视觉设计与 AI 驱动的交互体验，融合技术与美学，打造真正打动人心的数字产品。</p>
          <div ref={heroCtaRef} style={{ display:'flex',gap:'16px',justifyContent:'center' }} />
        </div>
        <div style={{ position:'absolute',bottom:'40px',left:'50%',transform:'translateX(-50%)',zIndex:3,display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',color:'#444',fontSize:'12px',letterSpacing:'2px' }}><span>向下探索</span><div style={{ width:'1px',height:'40px',background:'linear-gradient(to bottom, #444, transparent)' }} /></div>
      </section>

      <section ref={brandRef} style={{ padding:'100px 0',background:'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ maxWidth:'900px',margin:'0 auto',textAlign:'center' }}>
            <div style={{ display:'inline-block',padding:'4px 12px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',letterSpacing:'1px',marginBottom:'16px' }}>品牌宣言</div>
            <h2 style={{ fontSize:'32px',fontWeight:'600',lineHeight:'1.4',marginBottom:'24px' }}>设计是<span style={{ color:'#a29bfe' }}>沟通</span>，不是装饰</h2>
            <p style={{ color:'#888',fontSize:'16px',lineHeight:'1.9',maxWidth:'700px',margin:'0 auto' }}>我相信好的设计来自对用户的深刻理解和对细节的极致追求。从视觉语言到交互逻辑，每一个决策都应该有它的理由。在这个 AI 快速发展的时代，我致力于将前沿技术融入设计流程，创造出既有温度又有效率的数字产品。</p>
          </div>
        </div>
      </section>

      <section ref={servicesRef} style={{ padding:'100px 0',background:'var(--bg-secondary)' }}>
        <div className="container">
          <div className="s-label" style={{ textAlign:'center',marginBottom:'56px' }}>
            <div style={{ display:'inline-block',padding:'4px 12px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',letterSpacing:'1px',marginBottom:'16px' }}>服务内容</div>
            <h2 style={{ fontSize:'32px',fontWeight:'600' }}>我能为你<span style={{ color:'#a29bfe' }}>做什么</span></h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'24px' }}>
            {services.map((s,i)=>(
              <div key={s.title} ref={el=>serviceCardsRef.current[i]=el}>
                <BorderGlow
                  glowColor="260 75 65"
                  backgroundColor="#1a1a1a"
                  borderRadius={16}
                  glowRadius={30}
                  glowIntensity={6}
                  edgeSensitivity={15}
                  coneSpread={45}
                  colors={['#6c5ce7', '#a29bfe', '#03B3C3']}
                >
                  <div style={{ padding:'36px 28px' }}>
                    <div style={{ width:'52px',height:'52px',borderRadius:'14px',background:'rgba(108,92,231,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'#a29bfe',marginBottom:'20px' }} dangerouslySetInnerHTML={{__html:s.icon}} />
                    <h3 style={{ fontSize:'20px',fontWeight:'600',color:'#f0f0f0',marginBottom:'12px' }}>{s.title}</h3>
                    <p style={{ fontSize:'14px',color:'#888',lineHeight:'1.8' }}>{s.desc}</p>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} style={{ padding:'80px 0',background:'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'24px' }}>
            {statsData.map((st,i)=>(
              <div key={st.label} ref={el=>statItemsRef.current[i]=el} style={{ padding:'36px 24px',textAlign:'center',background:'rgba(255,255,255,0.02)',borderRadius:'16px',border:'1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize:'44px',fontWeight:'700',background:'linear-gradient(135deg, #6c5ce7, #a29bfe)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'8px' }}>{st.value}</div>
                <div style={{ fontSize:'14px',color:'#888' }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}




