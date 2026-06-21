import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export default function ProfileCard({
  avatarUrl, name, title, handle, status, contactText,
  className = '', children
}) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const onMove = useCallback(e => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    gsap.to(el, { rotateX: ((y - cy) / cy) * -12, rotateY: ((x - cx) / cx) * 12, duration: 0.2, ease: 'power2.out', transformPerspective: 1000 });
    if (glowRef.current) {
      glowRef.current.style.background = 'radial-gradient(circle at ' + ((x/rect.width)*100) + '% ' + ((y/rect.height)*100) + '%, rgba(108,92,231,0.3) 0%, transparent 60%)';
    }
  }, []);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power3.out' });
    if (glowRef.current) glowRef.current.style.background = 'none';
  }, []);

  return (
    <div ref={cardRef} className={className}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ width:'100%',borderRadius:'20px',overflow:'hidden',position:'relative',border:'1px solid rgba(255,255,255,0.06)',background:'linear-gradient(135deg,#2a2a4a,#1a1a1a)',cursor:'default',transformStyle:'preserve-3d' }}>
      <div ref={glowRef} style={{ position:'absolute',inset:0,transition:'background 0.3s',pointerEvents:'none',zIndex:0 }} />
      <img src={avatarUrl} loading="lazy" alt={name} style={{ width:'100%',display:'block',objectFit:'cover',position:'relative',zIndex:1 }} />
      <div style={{ position:'absolute',bottom:0,left:0,right:0,padding:'24px',background:'linear-gradient(transparent,rgba(0,0,0,0.6))',zIndex:2 }}>
        <div style={{ fontSize:'20px',fontWeight:'600',color:'#f0f0f0' }}>{name}</div>
        <div style={{ fontSize:'13px',color:'#a29bfe',marginTop:'4px' }}>{title}</div>
      </div>
    </div>
  );
}