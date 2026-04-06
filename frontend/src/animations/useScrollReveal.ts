import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  markers?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 60,
      x = 0,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0.1,
      ease = 'power2.out',
      start = 'top 85%',
      scrub = false,
    } = options;

    const children = el.children.length > 0 ? el.children : [el];

    const ctx = gsap.context(() => {
      gsap.from(children, {
        y,
        x,
        opacity,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: scrub ? undefined : 'play none none none',
          scrub: scrub ? 1 : false,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [options]);

  return ref;
}
