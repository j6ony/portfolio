import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ProfileCard from '../components/ProfileCard'
import { ParticleCard } from '../components/MagicBento'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '8+', label: '项目经验' },
  { value: '5', label: '获奖荣誉' },
  { value: '20+', label: '团队协作' },
  { value: '85%', label: '代码复用率' },
]

const info = [
  { label: '电话', value: '18585943379' },
  { label: '邮箱', value: '2769074119@qq.com' },
  { label: '地区', value: '贵州省铜仁市碧江区' },
]

const awards = [
  { year: '2024', title: '中国国际大学生创新大赛二等奖', desc: '省级二等奖，项目创新性与实用性获得评委高度认可' },
  { year: '2024', title: '贵州省青年职业技能大赛优秀个人', desc: '志愿服务贡献突出，获评优秀个人称号' },
  { year: '2024', title: '一等奖学金', desc: '学业成绩名次前15%，综合素质测评优秀' },
  { year: '2024', title: '学院迎新活动 优秀个人', desc: '主导策划并执行迎新活动，获评优秀个人' },
  { year: '2023', title: '优秀共青团员', desc: '积极参与团组织活动，发挥模范带头作用' },
]

export default function AboutPage() {
  const sectionRef = useRef(null); const imgRef = useRef(null); const contentRef = useRef(null)
  const statsRef = useRef(null); const awardsRef = useRef(null); const awardItemsRef = useRef([])
  const timelineRef = useRef(null); const timelineItemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
      gsap.fromTo(contentRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      ScrollTrigger.create({ trigger: statsRef.current, start: 'top 85%', onEnter: () => { statsRef.current.querySelectorAll('.stat-item').forEach((el,i)=>{gsap.fromTo(el,{y:30,opacity:0},{y:0,opacity:1,duration:0.5,ease:'power3.out',delay:i*0.08})}) }, once: true })
      ScrollTrigger.create({ trigger: awardsRef.current, start: 'top 80%', onEnter: () => { awardItemsRef.current.forEach((el,i)=>{gsap.fromTo(el,{y:30,opacity:0},{y:0,opacity:1,duration:0.6,ease:'power3.out',delay:i*0.1})}) }, once: true })
      ScrollTrigger.create({ trigger: timelineRef.current, start: 'top 80%', onEnter: () => { timelineItemsRef.current.forEach((el,i)=>{gsap.fromTo(el,{y:20,opacity:0},{y:0,opacity:1,duration:0.5,ease:'power3.out',delay:i*0.12})}) }, once: true })
    }); return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef}>
      <section style={{ minHeight:'calc(100vh - 72px)',display:'flex',alignItems:'center',background:'var(--bg-secondary)',padding:'80px 0' }}>
        <div className="container" style={{ width:'100%' }}>
          <div style={{ display:'grid',gridTemplateColumns:'380px 1fr',gap:'80px',alignItems:'start' }}>
            <div ref={imgRef} style={{ transform:'translateX(-40px)' }}>
              <ProfileCard
                avatarUrl="/avatar.png"
                name="王德芳"
                title="视觉 / AI 设计师"
                handle="2769074119@qq.com"
                status="在线"
                contactText="联系我"
                enableTilt={true}
                behindGlowEnabled
                innerGradient="linear-gradient(135deg, rgba(108,92,231,0.12), rgba(26,26,46,0.5))"
                behindGlowColor="rgba(108, 92, 231, 0.4)"
                behindGlowSize="60%"
                className="about-profile-card"
                onContactClick={() => window.location.href='/contact'}
              />
              <div style={{ marginTop:'24px',display:'flex',flexDirection:'column',gap:'12px' }}>
                {info.map(i=>(
                  <div key={i.label} style={{ display:'flex',justifyContent:'space-between',padding:'12px 16px',background:'rgba(255,255,255,0.03)',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize:'13px',color:'#666' }}>{i.label}</span>
                    <span style={{ fontSize:'13px',color:'#a0a0a0',fontWeight:'500' }}>{i.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div ref={contentRef} style={{ transform:'translateX(40px)' }}>
              <div style={{ display:'inline-block',padding:'4px 12px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',letterSpacing:'1px',marginBottom:'20px' }}>关于我</div>
              <h2 style={{ fontSize:'36px',fontWeight:'600',marginBottom:'24px',lineHeight:'1.3' }}>用设计思维和AI 能力<br /><span style={{ color:'#666',fontWeight:'300' }}>创造更好的数字世界</span></h2>
              <p style={{ color:'#a0a0a0',fontSize:'15px',lineHeight:'1.8',marginBottom:'20px' }}>我是一名充满热情的设计师与开发者，贵州开放大学移动互联应用技术专业在读。在校期间荣获一等奖学金、中国国际大学生创新大赛二等奖等荣誉，拥有扎实的跨学科知识储备。</p>
              <p style={{ color:'#666',fontSize:'15px',lineHeight:'1.8',marginBottom:'40px' }}>曾担任学生会组织部部长，主导策划多场大型活动，积累了丰富的项目管理与团队协作经验。在技术方面，我专注于 uni-app 跨平台开发与 UI 交互设计，致力于在产品中实现美学与功能的完美平衡。</p>
              <div style={{ display:'flex',gap:'16px',marginBottom:'48px' }}>
                <div style={{ display:'flex',alignItems:'center',gap:'8px',padding:'10px 18px',background:'rgba(108,92,231,0.08)',borderRadius:'10px',border:'1px solid rgba(108,92,231,0.12)',color:'#a29bfe',fontSize:'13px',fontWeight:'500' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>贵州开放大学                </div>
                <div style={{ display:'flex',alignItems:'center',gap:'8px',padding:'10px 18px',background:'rgba(255,255,255,0.03)',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.06)',color:'#a0a0a0',fontSize:'13px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c6 3 10 0 12-5v-5"/></svg>2023 - 2026
                </div>
              </div>
              <div ref={statsRef} style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px' }}>
                {stats.map(s=>(
                  <ParticleCard key={s.label} className="stat-item magic-bento-card magic-bento-card--border-glow"
                    style={{ width:'100%',padding:'24px 16px',background:'rgba(255,255,255,0.02)',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.04)',textAlign:'center', display:'flex', flexDirection:'column' }}
                    enableTilt={true} enableMagnetism={true} clickEffect={true}
                    glowColor="108, 92, 231" particleCount={12}>
                    <div style={{ fontSize:'32px',fontWeight:'700',background:'linear-gradient(135deg,#6c5ce7,#a29bfe)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'6px' }}>{s.value}</div>
                    <div style={{ fontSize:'13px',color:'#666' }}>{s.label}</div>
                  </ParticleCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={awardsRef} style={{ padding:'100px 0',background:'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth:'1000px' }}>
          <div style={{ textAlign:'center',marginBottom:'56px' }}>
            <div style={{ display:'inline-block',padding:'4px 12px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',letterSpacing:'1px',marginBottom:'16px' }}>获奖荣誉</div>
            <h2 style={{ fontSize:'32px',fontWeight:'600' }}>高光<span style={{ color:'#a29bfe' }}>时刻</span></h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px' }}>
            {awards.slice(0,3).map((a,i)=>(
              <ParticleCard key={i} ref={el=>awardItemsRef.current[i]=el}
                className="magic-bento-card magic-bento-card--border-glow"
                style={{ padding:'28px',background:'var(--bg-card)',borderRadius:'16px',border:'1px solid rgba(255,255,255,0.04)' }}
                enableTilt={true} enableMagnetism={true} clickEffect={true}
                glowColor="108, 92, 231" particleCount={12}>
                <div style={{ display:'inline-block',padding:'3px 10px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',marginBottom:'12px' }}>{a.year}</div>
                <h4 style={{ fontSize:'16px',fontWeight:'600',color:'#f0f0f0',marginBottom:'8px' }}>{a.title}</h4>
                <p style={{ fontSize:'13px',color:'#888',lineHeight:'1.7' }}>{a.desc}</p>
              </ParticleCard>
            ))}
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'20px',marginTop:'20px' }}>
            {awards.slice(3).map((a,i)=>(
              <ParticleCard key={i+3} ref={el=>awardItemsRef.current[i+3]=el}
                className="magic-bento-card magic-bento-card--border-glow"
                style={{ padding:'28px',background:'var(--bg-card)',borderRadius:'16px',border:'1px solid rgba(255,255,255,0.04)' }}
                enableTilt={true} enableMagnetism={true} clickEffect={true}
                glowColor="108, 92, 231" particleCount={12}>
                <div style={{ display:'inline-block',padding:'3px 10px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',marginBottom:'12px' }}>{a.year}</div>
                <h4 style={{ fontSize:'16px',fontWeight:'600',color:'#f0f0f0',marginBottom:'8px' }}>{a.title}</h4>
                <p style={{ fontSize:'13px',color:'#888',lineHeight:'1.7' }}>{a.desc}</p>
              </ParticleCard>
            ))}
          </div>
        </div>
      </section>

      <section ref={timelineRef} style={{ padding:'100px 0',background:'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth:'800px' }}>
          <div style={{ textAlign:'center',marginBottom:'56px' }}>
            <div style={{ display:'inline-block',padding:'4px 12px',background:'rgba(108,92,231,0.1)',borderRadius:'6px',color:'#a29bfe',fontSize:'12px',fontWeight:'600',letterSpacing:'1px',marginBottom:'16px' }}>成长经历</div>
            <h2 style={{ fontSize:'32px',fontWeight:'600' }}>走过的<span style={{ color:'#a29bfe' }}>路</span></h2>
          </div>
          <div style={{ position:'relative',paddingLeft:'32px',borderLeft:'1px solid rgba(255,255,255,0.06)' }}>
            {[
              { year:'2023.09', title:'入学贵州开放大学', desc:'移动互联应用技术专业，开启技术与设计的学习之路' },
              { year:'2024.01', title:'担任学生会组织部部长', desc:'主导策划 3 场 150+ 人主题团日活动，活动完成率100%' },
              { year:'2024.06', title:'中国国际大学生创新大赛', desc:'荣获省级二等奖，项目创新性与实用性获得认可' },
              { year:'2024.09', title:'获评一等奖学金', desc:'学业成绩前15%，综合能力全面发展' },
              { year:'2025.01', title:'秒启视界小程序上线', desc:'基于 uni-app 开发微信视频小程序，代码复用率 85%+' },
              { year:'2025.06', title:'手机商城 APP 发布', desc:'跨平台电商应用，支持 Android/iOS/H5，性能提升 30%+' },
            ].map((item,i)=>(
              <div key={i} ref={el=>timelineItemsRef.current[i]=el} style={{ padding:'24px 0 24px 32px',position:'relative',borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ position:'absolute',left:'-37px',top:'28px',width:'10px',height:'10px',borderRadius:'50%',background:'#6c5ce7',border:'2px solid #1a1a1a' }} />
                <div style={{ fontSize:'12px',color:'#a29bfe',fontWeight:'600',marginBottom:'4px',letterSpacing:'0.5px' }}>{item.year}</div>
                <h4 style={{ fontSize:'16px',fontWeight:'600',color:'#f0f0f0',marginBottom:'4px' }}>{item.title}</h4>
                <p style={{ fontSize:'13px',color:'#888',lineHeight:'1.7',margin:0 }}>{item.desc}</p>
                            </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
