import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initScrollReveals } from './scroll-motion';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector<HTMLElement>('[data-hero]');
const frame = document.querySelector<HTMLElement>('[data-hero-frame]');

if (!reduce.matches && hero && frame) {
  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
  intro
    .from(frame, { clipPath: 'inset(8% 7% 8% 7% round 28px)', scale: 1.08, duration: 1.45 })
    .from('[data-hero-detail]', { opacity: 0, y: 18, duration: .8, stagger: .12 }, .18)
    .from('.home-hero__title-line > span', { yPercent: 112, duration: 1.08, stagger: .1 }, .25)
    .from('[data-hero-copy]', { opacity: 0, y: 24, duration: .8 }, .72)
    .from('[data-hero-cta]', { opacity: 0, y: 24, scale: .96, duration: .8 }, .82);

  gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .8 } })
    .to(frame, { scale: .91, yPercent: 8, clipPath: 'inset(4% 3% 0% 3% round 34px)', ease: 'none' }, 0)
    .to('.home-hero__title', { yPercent: -13, opacity: .18, ease: 'none' }, 0)
    .to('.home-hero__support', { yPercent: -24, opacity: 0, ease: 'none' }, 0)
    .to('.home-hero__wash', { opacity: .45, ease: 'none' }, 0);

  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (finePointer) {
    const layers = gsap.utils.toArray<HTMLElement>('[data-depth]');
    const moveX = layers.map((el) => gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }));
    const moveY = layers.map((el) => gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }));
    hero.addEventListener('pointermove', (event) => {
      const x = event.clientX / innerWidth - .5;
      const y = event.clientY / innerHeight - .5;
      layers.forEach((el, i) => { const depth = Number(el.dataset.depth || 1); moveX[i](x * 13 * depth); moveY[i](y * 10 * depth); });
    }, { passive: true });

    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((item) => {
      const setX = gsap.quickTo(item, 'x', { duration: .45, ease: 'power3.out' });
      const setY = gsap.quickTo(item, 'y', { duration: .45, ease: 'power3.out' });
      item.addEventListener('pointermove', (event) => { const r = item.getBoundingClientRect(); setX((event.clientX-r.left-r.width/2)*.12); setY((event.clientY-r.top-r.height/2)*.12); });
      item.addEventListener('pointerleave', () => { setX(0); setY(0); });
    });
  }

  const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: .9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

initScrollReveals(reduce.matches);
