// Motion CLICOM — un seul moteur (GSAP) pour reveals, scènes et scroll.
// Lenis ne gère que le scroll ; tout le reste passe par GSAP + ScrollTrigger.
// Cycle de vie Astro : cleanup avant swap, ré-initialisation après swap.
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './core';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

let lenis: Lenis | null = null;
let lenisRaf: ((time: number) => void) | null = null;
let ctx: gsap.Context | null = null;

const EASE = 'power3.out';

function forceVisible(root: HTMLElement | Document = document) {
  root.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-children] > *, [data-hero-el], [data-hero-title] > span, [data-flow-node], [data-flow-path]').forEach((el) => {
    gsap.set(el, { opacity: 1, y: 0, yPercent: 0, scale: 1, clipPath: 'none', strokeDashoffset: 0, clearProps: 'transform' });
  });
}

function initLenis() {
  if (!finePointer || reduced || lenis) return;
  lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: 0.92 });
  lenis.on('scroll', ScrollTrigger.update);
  lenisRaf = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(lenisRaf);
  gsap.ticker.lagSmoothing(0);
}

function initReveals(root: HTMLElement) {
  if (reduced) {
    forceVisible(root);
    return;
  }

  // Média — révélation par masque + échelle très légère
  gsap.utils.toArray<HTMLElement>('[data-reveal="media"]', root).forEach((el) => {
    const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    const round = radius ? ` round ${radius}px` : '';
    gsap.fromTo(el,
      { clipPath: `inset(7% 4% 7% 4%${round})`, scale: 1.06, opacity: 0 },
      {
        clipPath: `inset(0% 0% 0% 0%${round})`, scale: 1, opacity: 1,
        duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
  });

  // Titre — révélation par masque vertical
  gsap.utils.toArray<HTMLElement>('[data-reveal="clip"]', root).forEach((el) => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 0 100% 0)', y: 26, opacity: 0 },
      {
        clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1,
        duration: 1, ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
  });

  // Groupe — entrée échelonnée des enfants
  gsap.utils.toArray<HTMLElement>('[data-reveal-children]', root).forEach((group) => {
    const kids = gsap.utils.toArray<HTMLElement>(group.children);
    if (!kids.length) return;
    gsap.fromTo(kids, { opacity: 0, y: 22 }, {
      opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: EASE,
      scrollTrigger: { trigger: group, start: 'top 82%', once: true },
    });
  });

  // Fade simple
  gsap.utils.toArray<HTMLElement>('[data-reveal="fade"], [data-reveal=""]', root).forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 26 }, {
      opacity: 1, y: 0, duration: 0.85, ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });
}

function initHero(root: HTMLElement) {
  const title = root.querySelector<HTMLElement>('[data-hero-title]');
  const lines = title ? gsap.utils.toArray<HTMLElement>('span', title) : [];
  const els = gsap.utils.toArray<HTMLElement>('[data-hero-el]', root).filter((el) => el !== title && !title?.contains(el));
  const scene = root.querySelector<HTMLElement>('[data-hero-scene]');

  if (reduced) {
    forceVisible(root);
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: EASE } });
  if (lines.length) {
    tl.fromTo(lines, { yPercent: 112 }, { yPercent: 0, duration: 1.05, stagger: 0.09, ease: 'power4.out' }, 0.1);
  } else if (title) {
    tl.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.1);
  }
  tl.fromTo(els, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 }, 0.35);

  if (scene) {
    const paths = gsap.utils.toArray<SVGPathElement>('[data-hero-path]', scene);
    const nodes = gsap.utils.toArray<SVGGElement>('[data-hero-node]', scene);
    gsap.set(paths, { strokeDashoffset: 1 });
    gsap.set(nodes, { scale: 0, opacity: 0, transformOrigin: 'center' });
    tl.to(paths, { strokeDashoffset: 0, duration: 0.9, stagger: 0.1, ease: 'none' }, 0.55);
    tl.to(nodes, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.8)' }, 0.85);
  }

  return tl;
}

function initMethod(root: HTMLElement) {
  const steps = gsap.utils.toArray<HTMLElement>('[data-method-step]', root);
  const progress = root.querySelector<HTMLElement>('[data-method-progress]');
  if (!steps.length) return;

  if (reduced) {
    steps.forEach((s) => s.classList.add('is-active'));
    if (progress) gsap.set(progress, { scaleX: 1 });
    return;
  }

  if (progress) {
    gsap.fromTo(progress, { scaleX: 0 }, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: root, start: 'top 72%', end: 'bottom 62%', scrub: 0.6 },
    });
  }

  const activate = (index: number) => {
    steps.forEach((step, i) => {
      step.classList.toggle('is-active', i === index);
      step.classList.toggle('is-past', i < index);
    });
  };

  steps.forEach((step, index) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 74%',
      onEnter: () => activate(index),
      onEnterBack: () => activate(index),
    });
  });
}

function initFlow(root: HTMLElement) {
  const paths = gsap.utils.toArray<SVGPathElement>('[data-flow-path]', root);
  const nodes = gsap.utils.toArray<SVGGElement>('[data-flow-node]', root);
  if (!paths.length && !nodes.length) return;

  if (reduced) {
    gsap.set([...paths, ...nodes], { strokeDashoffset: 0, opacity: 1, scale: 1 });
    return;
  }

  gsap.set(paths, { strokeDashoffset: 1 });
  gsap.set(nodes, { opacity: 0, scale: 0.6, transformOrigin: 'center' });
  gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 76%', once: true } })
    .to(nodes, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(1.6)' }, 0)
    .to(paths, { strokeDashoffset: 0, duration: 0.7, stagger: 0.15, ease: 'none' }, 0.2);
}

function cleanup() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  ctx?.revert();
  ctx = null;
  if (lenisRaf) {
    gsap.ticker.remove(lenisRaf);
    lenisRaf = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  // Contenu toujours visible pendant la transition de sortie
  forceVisible();
}

function init() {
  // Ré-initialisation robuste : le document persiste entre navigations SPA,
  // c'est le body qui change. Un marqueur global évite le double binding
  // entre le module de la page sortante et celui de la page entrante.
  if (document.body.dataset.motionBound === 'true') return;
  cleanup();
  document.body.dataset.motionBound = 'true';

  const body = document.body;
  ctx = gsap.context(() => {
    initLenis();
    initReveals(body);

    const hero = body.querySelector<HTMLElement>('[data-hero]');
    if (hero) initHero(hero);

    const method = body.querySelector<HTMLElement>('[data-method-section]');
    if (method) initMethod(method);

    const flow = body.querySelector<HTMLElement>('[data-flow-section]');
    if (flow) initFlow(flow);

    ScrollTrigger.refresh();
  }, body);
}

document.addEventListener('astro:before-swap', cleanup);
document.addEventListener('astro:after-swap', () => init());

window.addEventListener('load', () => ScrollTrigger.refresh());

init();
