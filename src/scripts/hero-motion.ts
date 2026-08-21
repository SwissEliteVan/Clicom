import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './motion/core';

const hero = document.querySelector<HTMLElement>('[data-hero]');
if (hero) initialiseHero(hero);

function initialiseHero(root: HTMLElement) {
  const context = gsap.context(() => {
    const media = gsap.matchMedia();
    const listeners: Array<() => void> = [];
    let intro: gsap.core.Timeline | undefined;

    const on = <K extends keyof HTMLElementEventMap>(element: HTMLElement, type: K, handler: (event: HTMLElementEventMap[K]) => void) => {
      element.addEventListener(type, handler as EventListener);
      listeners.push(() => element.removeEventListener(type, handler as EventListener));
    };

    media.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
      const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]', root);
      const paths = gsap.utils.toArray<SVGPathElement>('[data-flow]', root);
      const core = root.querySelector<HTMLElement>('[data-hero-core]');
      const stage = root.querySelector<HTMLElement>('[data-hero-stage]');
      const traveller = root.querySelector<HTMLElement>('[data-request-traveller]');
      const requestForm = root.querySelector<HTMLElement>('[data-request-form]');
      const requestCard = root.querySelector<HTMLElement>('[data-request-card]');
      const pipelineCard = root.querySelector<HTMLElement>('[data-pipeline-card]');
      const automationSteps = gsap.utils.toArray<HTMLElement>('[data-automation-step]', root);
      const resultBars = gsap.utils.toArray<HTMLElement>('[data-result-bar]', root);
      const securityRows = gsap.utils.toArray<HTMLElement>('[data-security-row]', root);

      gsap.set(scenes, { opacity: 0, scale: .9, y: 12 });
      gsap.set(paths, { strokeDashoffset: 1 });
      gsap.set('[data-scene="results"], [data-scene="security"]', { visibility: 'visible' });
      gsap.set(resultBars, { scaleX: 0 });
      gsap.set(automationSteps, { opacity: .42 });

      intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from(core, { opacity: 0, scale: .45, duration: .3 })
        .from('.hero-product__stage', { opacity: 0, scale: .97, duration: .35 }, 0)
        .from('.hero-product h1 b', { yPercent: 18, opacity: .5, stagger: .05, duration: 2.7 }, .08)
        .from('[data-hero-copy], [data-hero-detail]', { opacity: .55, y: 8, stagger: .04, duration: 2.65 }, .12)
        .from('[data-hero-cta]', { opacity: .62, y: 8, scale: .98, duration: 2.55 }, .25)
        .to('[data-scene="search"]', { opacity: 1, scale: 1, y: 0, duration: .22 }, .18)
        .from('[data-search-text]', { clipPath: 'inset(0 100% 0 0)', duration: .32, ease: 'steps(18)' }, .25)
        .to('[data-search-curve]', { strokeDashoffset: 0, duration: .28 }, .37)
        .add(() => { const position = root.querySelector('[data-search-position]'); if (position) position.textContent = '4'; }, .46)
        .add(() => { const position = root.querySelector('[data-search-position]'); if (position) position.textContent = '2'; }, .58)
        .to(paths[0], { strokeDashoffset: 0, duration: .2 }, .52)
        .to('[data-scene="site"]', { opacity: 1, scale: 1, y: 0, duration: .22 }, .62)
        .to(paths[1], { strokeDashoffset: 0, duration: .16 }, .78)
        .to('[data-scene="request"]', { opacity: 1, scale: 1, y: 0, duration: .2 }, .82)
        .from('[data-form-name], [data-form-service]', { clipPath: 'inset(0 100% 0 0)', stagger: .08, duration: .18 }, .92)
        .to('[data-request-submit]', { scale: .94, backgroundColor: '#f7f9fc', duration: .09, yoyo: true, repeat: 1 }, 1.14)
        .to(requestForm, { opacity: 0, scale: .96, duration: .15 }, 1.28)
        .to(requestCard, { opacity: 1, scale: 1, duration: .18 }, 1.3)
        .set(traveller, { opacity: 1 }, 1.48)
        .to(traveller, { x: -95, y: 245, scale: .82, duration: .36, ease: 'power2.inOut' }, 1.5)
        .to(paths[2], { strokeDashoffset: 0, duration: .28 }, 1.5)
        .to('[data-scene="followup"]', { opacity: 1, scale: 1, y: 0, duration: .2 }, 1.65)
        .to(traveller, { opacity: 0, duration: .08 }, 1.85)
        .to(pipelineCard, { xPercent: 118, duration: .26, ease: 'power2.inOut' }, 1.86)
        .to(pipelineCard, { xPercent: 236, duration: .3, ease: 'power2.inOut' }, 2.13)
        .to(paths[3], { strokeDashoffset: 0, duration: .2 }, 2.0)
        .to('[data-scene="automation"]', { opacity: 1, scale: 1, y: 0, duration: .2 }, 2.05)
        .to(automationSteps, { opacity: 1, stagger: .07, duration: .08, onStart() { automationSteps.forEach((step,index) => gsap.delayedCall(index * .07, () => { step.classList.add('is-active'); const state = step.querySelector('small'); if (state) state.textContent = 'Terminé'; })); } }, 2.12)
        .to(paths[4], { strokeDashoffset: 0, duration: .15 }, 2.28)
        .to('[data-scene="assist"]', { opacity: 1, scale: 1, y: 0, duration: .18 }, 2.3)
        .to('[data-ai-status]', { opacity: .35, duration: .08, yoyo: true, repeat: 1 }, 2.42)
        .to(paths[5], { strokeDashoffset: 0, duration: .14 }, 2.48)
        .to('[data-scene="results"]', { opacity: 1, scale: 1, y: 0, duration: .16 }, 2.5)
        .to(resultBars, { scaleX: 1, stagger: .04, duration: .16 }, 2.52)
        .to(paths[6], { strokeDashoffset: 0, duration: .14 }, 2.58)
        .to('[data-scene="security"]', { opacity: 1, scale: 1, y: 0, duration: .16 }, 2.62)
        .from(securityRows, { opacity: .25, x: -5, stagger: .035, duration: .12 }, 2.64);

      const scroll = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: .75 } });
      scroll.to('[data-hero-copy-block]', { scale: .94, yPercent: -8, opacity: .12, ease: 'none' }, 0).to(stage, { scale: 1.22, xPercent: -18, yPercent: 8, ease: 'none' }, 0).to(scenes, { xPercent: index => (index % 2 ? -5 : 5), yPercent: index => index < 4 ? 8 : -8, ease: 'none' }, 0);

      if (stage && matchMedia('(pointer:fine)').matches) {
        const depthLayers = gsap.utils.toArray<HTMLElement>('[data-depth]', root);
        const xSetters = depthLayers.map(element => gsap.quickTo(element, 'x', { duration: .7, ease: 'power3.out' }));
        const ySetters = depthLayers.map(element => gsap.quickTo(element, 'y', { duration: .7, ease: 'power3.out' }));
        const rotateX = gsap.quickTo(stage, 'rotationX', { duration: .8, ease: 'power3.out' });
        const rotateY = gsap.quickTo(stage, 'rotationY', { duration: .8, ease: 'power3.out' });
        on(root, 'pointermove', event => { const bounds = root.getBoundingClientRect(); const x = (event.clientX - bounds.left) / bounds.width - .5; const y = (event.clientY - bounds.top) / bounds.height - .5; depthLayers.forEach((layer,index) => { const depth = Number(layer.dataset.depth || .5); xSetters[index](x * 18 * depth); ySetters[index](y * 14 * depth); }); rotateX(-y * 3); rotateY(x * 3); });
        on(root, 'pointerleave', () => { depthLayers.forEach((_,index) => { xSetters[index](0); ySetters[index](0); }); rotateX(0); rotateY(0); });
      }

      const replay = (selector: string, animation: () => void) => { const element = root.querySelector<HTMLElement>(selector); if (element) on(element, 'pointerenter', animation); };
      replay('[data-scene="search"]', () => gsap.fromTo('[data-search-curve]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .65 }));
      replay('[data-scene="site"]', () => gsap.fromTo('[data-site-button]', { scale: 1 }, { scale: .92, yoyo: true, repeat: 1, duration: .16 }));
      replay('[data-scene="followup"]', () => gsap.to(pipelineCard, { xPercent: '+=18', yoyo: true, repeat: 1, duration: .22 }));
      replay('[data-scene="automation"]', () => gsap.fromTo(automationSteps, { opacity: .4 }, { opacity: 1, stagger: .07, duration: .08 }));
      replay('[data-scene="results"]', () => gsap.fromTo(resultBars, { scaleX: .55 }, { scaleX: 1, stagger: .05, duration: .22 }));
      replay('[data-scene="security"]', () => gsap.fromTo(securityRows, { opacity: .35 }, { opacity: 1, stagger: .06, duration: .12 }));

      const visibility = new IntersectionObserver(([entry]) => entry.isIntersecting ? intro?.resume() : intro?.pause(), { threshold: .05 });
      visibility.observe(root);
      return () => { visibility.disconnect(); listeners.splice(0).forEach(remove => remove()); };
    });

    media.add('(max-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-product h1 b', { yPercent: 110, stagger: .08, duration: .55, ease: 'power3.out' });
      gsap.from('.hero-product__scene', { opacity: 0, y: 18, stagger: .08, duration: .45, ease: 'power2.out', delay: .25 });
    });

    media.add('(prefers-reduced-motion: reduce)', () => gsap.set('*', { clearProps: 'all' }));
    return () => { listeners.splice(0).forEach(remove => remove()); media.revert(); };
  }, root);

  const lenis = new Lenis({ duration: 1.02, smoothWheel: true, wheelMultiplier: .9 });
  const tick = (time: number) => lenis.raf(time * 1000);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  const cleanup = () => { gsap.ticker.remove(tick); lenis.destroy(); context.revert(); ScrollTrigger.getAll().filter(trigger => root.contains(trigger.trigger as Node)).forEach(trigger => trigger.kill()); };
  document.addEventListener('astro:before-swap', cleanup, { once: true });
}
