import { useRef, useEffect, useCallback, forwardRef } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const createParticle = (x, y, color) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = 'position:absolute;width:5px;height:5px;border-radius:50%;background:rgba(' + color + ',0.9);box-shadow:0 0 12px rgba(' + color + ',0.8),0 0 24px rgba(' + color + ',0.4);pointer-events:none;z-index:100;left:' + x + 'px;top:' + y + 'px;';
  return el;
};

export const ParticleCard = forwardRef(({
  children, className = '', style, disableAnimations = false,
  particleCount = 8, glowColor = '108, 92, 231',
  enableTilt = true, clickEffect = true, enableMagnetism = true
}, forwardedRef) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const setRef = useCallback(el => {
    cardRef.current = el;
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  }, [forwardedRef]);

  const initParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticle(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach(p => {
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.2, ease: 'back.in(2)', onComplete: () => p.parentNode?.removeChild(p) });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initParticles();
    memoizedParticles.current.forEach((particle, index) => {
      const t = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 160, y: (Math.random() - 0.5) * 160, rotation: Math.random() * 720, duration: 3 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.6 + Math.random() * 0.4, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true });
      }, index * 80);
      timeoutsRef.current.push(t);
    });
  }, [initParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;

    const onEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) gsap.to(el, { rotateX: 8, rotateY: 8, duration: 0.4, ease: 'power3.out', transformPerspective: 1200 });
    };
    const onLeave = () => {
      isHoveredRef.current = false;
      clearParticles();
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power3.out' });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' });
      el.style.setProperty('--glow-intensity', '0');
    };
    const onMove = e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      if (enableTilt) gsap.to(el, { rotateX: ((y - centerY) / centerY) * -18, rotateY: ((x - centerX) / centerX) * 18, duration: 0.08, ease: 'power2.out', transformPerspective: 1200 });
      if (enableMagnetism) magnetismAnimationRef.current = gsap.to(el, { x: (x - centerX) * 0.12, y: (y - centerY) * 0.12, duration: 0.3, ease: 'power2.out' });
      el.style.setProperty('--glow-x', ((x / rect.width) * 100) + '%');
      el.style.setProperty('--glow-y', ((y / rect.height) * 100) + '%');
      el.style.setProperty('--glow-intensity', '1');
    };
    const onClick = e => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDist = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height)) * 1.5;
      const ripple = document.createElement('div');
      ripple.style.cssText = 'position:absolute;width:' + (maxDist * 2) + 'px;height:' + (maxDist * 2) + 'px;border-radius:50%;background:radial-gradient(circle,rgba(' + glowColor + ',0.6) 0%,rgba(' + glowColor + ',0.3) 30%,transparent 70%);left:' + (x - maxDist) + 'px;top:' + (y - maxDist) + 'px;pointer-events:none;z-index:1000;';
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 0.8 }, { scale: 1, opacity: 0, duration: 1.2, ease: 'power3.out', onComplete: () => ripple.remove() });
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('click', onClick);
    return () => {
      isHoveredRef.current = false;
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('click', onClick);
      clearParticles();
    };
  }, [animateParticles, clearParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={setRef} className={(className ? className + ' ' : '') + 'particle-container'} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  );
});
ParticleCard.displayName = 'ParticleCard';

export default function MagicBento() { return null; }