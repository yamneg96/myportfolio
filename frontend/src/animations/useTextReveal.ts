import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TextRevealOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  y?: number;
}

export function useTextReveal<T extends HTMLElement>(
  options: TextRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      duration = 0.6,
      stagger = 0.03,
      delay = 0.3,
      ease = 'power3.out',
      y = 50,
    } = options;

    // Split text into characters
    const text = el.textContent || '';
    el.innerHTML = '';
    el.style.overflow = 'hidden';

    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00a0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      el.appendChild(span);
      return span;
    });

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease,
        startAt: { y, opacity: 0 },
      });
    }, el);

    return () => ctx.revert();
  }, [options]);

  return ref;
}
