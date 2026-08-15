import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initScrollReveals } from './scroll-motion';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const hero = document.querySelector<HTMLElement>('[data-hero]');
const frame = document.querySelector<HTMLElement>('[data-hero-frame]');
const cleanups: Array<() => void> = [];
let lenis: Lenis | null = null;

const addCleanup = (fn: () => void) => cleanups.push(fn);

if (!reduceMotion.matches && hero && frame) {
  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
  const connections = gsap.utils.toArray<SVGPathElement>('[data-hero-connection]');
  const nodes = gsap.utils.toArray<HTMLElement>('[data-hero-node]');

  intro
    .from(frame, { opacity: 0, scale: 1.08, duration: 1.35 })
    .from('[data-hero-detail]', { opacity: 0, y: 18, duration: .72, stagger: .08 }, .12)
    .from('.home-hero__title-line > span', { yPercent: 112, duration: 1.08, stagger: .09 }, .24)
    .from('[data-hero-copy]', { opacity: 0, y: 24, duration: .8 }, .7)
    .from('[data-hero-cta]', { opacity: 0, y: 22, scale: .97, duration: .78 }, .82)
    .from('[data-hero-network]', { opacity: 0, scale: .95, duration: .9 }, .52)
    .from(nodes, { opacity: 0, scale: .75, duration: .55, stagger: .07 }, .82)
    .to(connections, { strokeDashoffset: 0, duration: 1.15, stagger: .08, ease: 'power2.inOut' }, .92);

  const scrollTl = gsap.timeline({
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .8 },
  });
  scrollTl
    .to(frame, { scale: .94, yPercent: 5, opacity: .7, ease: 'none' }, 0)
    .to('.home-hero__title', { yPercent: -9, opacity: .22, ease: 'none' }, 0)
    .to('.home-hero__support', { yPercent: -18, opacity: .15, ease: 'none' }, 0)
    .to('.home-hero__visual', { yPercent: 8, scale: .96, ease: 'none' }, 0);

  if (finePointer.matches) {
    const layers = gsap.utils.toArray<HTMLElement>('[data-depth]');
    const moveX = layers.map((el) => gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }));
    const moveY = layers.map((el) => gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }));
    const onHeroPointer = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      layers.forEach((el, i) => {
        const depth = Number(el.dataset.depth || 1);
        moveX[i](x * 16 * depth);
        moveY[i](y * 12 * depth);
      });
    };
    hero.addEventListener('pointermove', onHeroPointer, { passive: true });
    addCleanup(() => hero.removeEventListener('pointermove', onHeroPointer));

    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((item) => {
      const setX = gsap.quickTo(item, 'x', { duration: .42, ease: 'power3.out' });
      const setY = gsap.quickTo(item, 'y', { duration: .42, ease: 'power3.out' });
      const move = (event: PointerEvent) => {
        const rect = item.getBoundingClientRect();
        setX((event.clientX - rect.left - rect.width / 2) * .12);
        setY((event.clientY - rect.top - rect.height / 2) * .12);
      };
      const leave = () => { setX(0); setY(0); };
      item.addEventListener('pointermove', move, { passive: true });
      item.addEventListener('pointerleave', leave);
      addCleanup(() => {
        item.removeEventListener('pointermove', move);
        item.removeEventListener('pointerleave', leave);
      });
    });

    const cursor = document.createElement('div');
    cursor.className = 'home-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.append(cursor);
    const cursorX = gsap.quickTo(cursor, 'x', { duration: .24, ease: 'power3.out' });
    const cursorY = gsap.quickTo(cursor, 'y', { duration: .24, ease: 'power3.out' });
    const onPointerMove = (event: PointerEvent) => { cursorX(event.clientX); cursorY(event.clientY); };
    const interactive = document.querySelectorAll<HTMLElement>('a,button,[data-magnetic],.home-expertise-card,.home-work-project');
    const enter = () => cursor.classList.add('is-active');
    const leave = () => cursor.classList.remove('is-active');
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    interactive.forEach((el) => { el.addEventListener('pointerenter', enter); el.addEventListener('pointerleave', leave); });
    addCleanup(() => {
      window.removeEventListener('pointermove', onPointerMove);
      interactive.forEach((el) => { el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); });
      cursor.remove();
    });
  }

  lenis = new Lenis({ duration: 1.02, smoothWheel: true, wheelMultiplier: .9 });
  const onLenisScroll = () => ScrollTrigger.update();
  const ticker = (time: number) => lenis?.raf(time * 1000);
  lenis.on('scroll', onLenisScroll);
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);
  addCleanup(() => {
    gsap.ticker.remove(ticker);
    lenis?.destroy();
    lenis = null;
  });
}

if (!reduceMotion.matches) {
  const systemProgress = document.querySelector<SVGPathElement>('[data-system-progress]');
  const system = document.querySelector<HTMLElement>('[data-home-system]');
  if (systemProgress && system) {
    gsap.to(systemProgress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: system, start: 'top 78%', end: 'bottom 42%', scrub: 1 },
    });
  }

  const methodProgress = document.querySelector<HTMLElement>('[data-method-progress]');
  const method = document.querySelector<HTMLElement>('[data-home-method]');
  if (methodProgress && method) {
    gsap.to(methodProgress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: method, start: 'top 78%', end: 'bottom 48%', scrub: 1 },
    });
  }
}

initScrollReveals(reduceMotion.matches);

const cleanupAll = () => {
  cleanups.splice(0).forEach((cleanup) => cleanup());
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf('*');
};

document.addEventListener('astro:before-swap', cleanupAll, { once: true });
