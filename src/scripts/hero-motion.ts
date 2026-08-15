import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initScrollReveals } from './scroll-motion';

gsap.registerPlugin(ScrollTrigger);

type Cleanup = () => void;

const root = document.querySelector<HTMLElement>('.home-shell');
const hero = document.querySelector<HTMLElement>('[data-hero]');
const globalCleanups: Cleanup[] = [];
const mm = gsap.matchMedia();

const systemLabels = [
  '01 / PRÉSENCE DIGITALE',
  '02 / ACQUISITION',
  '03 / AUTOMATISATION',
  '04 / PERFORMANCE & SÉCURITÉ',
];

const activateSystemStage = (index: number) => {
  const safeIndex = Math.max(0, Math.min(index, systemLabels.length - 1));
  const steps = gsap.utils.toArray<HTMLElement>('[data-system-step]');
  const channels = gsap.utils.toArray<HTMLElement>('[data-system-channel]');
  const flows = gsap.utils.toArray<SVGPathElement>('[data-system-flow]');
  const status = document.querySelector<HTMLElement>('[data-system-status]');

  steps.forEach((step, stepIndex) => {
    step.classList.toggle('is-active', stepIndex === safeIndex);
    step.classList.toggle('is-past', stepIndex < safeIndex);
  });

  channels.forEach((channel) => {
    const channelIndex = Number(channel.dataset.systemChannel || 0);
    gsap.to(channel, {
      opacity: channelIndex <= safeIndex ? 1 : .2,
      scale: channelIndex === safeIndex ? 1.08 : 1,
      y: channelIndex === safeIndex ? -4 : 0,
      duration: .5,
      ease: 'power3.out',
      overwrite: true,
    });
  });

  flows.forEach((flow) => {
    const flowIndex = Number(flow.dataset.systemFlow || 0);
    gsap.to(flow, {
      strokeDashoffset: flowIndex <= safeIndex ? 0 : 1,
      opacity: flowIndex <= safeIndex ? 1 : .12,
      duration: .75,
      ease: 'power2.inOut',
      overwrite: true,
    });
  });

  if (status) status.textContent = systemLabels[safeIndex];

  gsap.to('[data-system-core]', {
    scale: 1 + safeIndex * .035,
    rotate: safeIndex * 4,
    duration: .65,
    ease: 'power3.out',
    overwrite: true,
  });

  gsap.to('[data-system-pulse]', {
    opacity: .18 + safeIndex * .12,
    scale: 1 + safeIndex * .08,
    duration: .65,
    ease: 'power3.out',
    overwrite: true,
  });
};

const createCinematicHero = (localCleanups: Cleanup[]) => {
  if (!hero) return;

  const frame = hero.querySelector<HTMLElement>('[data-hero-frame]');
  const connections = gsap.utils.toArray<SVGPathElement>('[data-hero-connection]');
  const nodes = gsap.utils.toArray<HTMLElement>('[data-hero-node]');
  const maturity = gsap.utils.toArray<HTMLElement>('.home-hero__maturity span');

  gsap.set(connections, { strokeDashoffset: 1 });
  gsap.set(nodes, { transformOrigin: '50% 50%' });
  gsap.set(maturity, { opacity: 0, y: 10 });

  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

  if (frame) {
    intro.from(frame, {
      opacity: 0,
      scale: 1.12,
      filter: 'blur(18px)',
      duration: 1.45,
    });
  }

  intro
    .from('[data-hero-network]', { opacity: 0, scale: .9, filter: 'blur(18px)', duration: .9 }, .1)
    .from('[data-hero-detail]', { opacity: 0, y: 20, duration: .68, stagger: .07 }, .18)
    .from(nodes, { opacity: 0, scale: .48, filter: 'blur(10px)', duration: .58, stagger: { each: .06, from: 'center' } }, .36)
    .to(connections, { strokeDashoffset: 0, duration: 1.25, stagger: .09, ease: 'power2.inOut' }, .48)
    .from('.home-hero__core', { boxShadow: '0 0 0 0 rgba(34,211,238,0)', duration: .65 }, .54)
    .from('.home-hero__title-line > span', {
      yPercent: 120,
      rotate: 2.2,
      filter: 'blur(12px)',
      duration: 1.05,
      stagger: .11,
    }, .56)
    .from('[data-hero-copy]', { opacity: 0, y: 26, filter: 'blur(8px)', duration: .72, stagger: .09 }, 1.02)
    .from('[data-hero-cta]', { opacity: 0, y: 24, scale: .96, duration: .72 }, 1.18)
    .to(maturity, { opacity: 1, y: 0, duration: .48, stagger: .08 }, 1.28)
    .from('.home-hero__ticker', { opacity: 0, y: 22, duration: .65 }, 1.34);

  const ticker = gsap.to('.home-hero__scan', {
    xPercent: 760,
    duration: 5.4,
    repeat: -1,
    ease: 'none',
  });
  localCleanups.push(() => ticker.kill());
};

const createDesktopInteractions = (localCleanups: Cleanup[]) => {
  if (!hero) return;

  const heroScroll = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: .9,
    },
  });

  heroScroll
    .to('[data-hero-frame]', { scale: .9, yPercent: 8, opacity: .55, ease: 'none' }, 0)
    .to('.home-hero__title', { yPercent: -12, opacity: .14, ease: 'none' }, 0)
    .to('.home-hero__support', { yPercent: -22, opacity: .06, ease: 'none' }, 0)
    .to('.home-hero__visual', { yPercent: 14, scale: .93, rotate: .55, ease: 'none' }, 0)
    .to('.home-hero__maturity span', { y: -18, opacity: .28, stagger: .03, ease: 'none' }, .12)
    .to('.home-hero__ticker', { yPercent: 100, ease: 'none' }, .55);

  const systemStory = document.querySelector<HTMLElement>('[data-system-story]');
  const systemVisual = document.querySelector<HTMLElement>('[data-system-visual]');
  const systemSteps = gsap.utils.toArray<HTMLElement>('[data-system-step]');

  if (systemStory && systemVisual && systemSteps.length) {
    activateSystemStage(0);

    const story = gsap.timeline({
      scrollTrigger: {
        trigger: systemStory,
        start: 'top top+=72',
        end: 'bottom bottom',
        scrub: .9,
        onUpdate: (self) => activateSystemStage(Math.round(self.progress * (systemSteps.length - 1))),
      },
    });

    story
      .to('[data-system-core]', { rotate: 18, scale: 1.12, ease: 'none' }, 0)
      .to('.home-system-orbit--outer', { rotate: 120, ease: 'none' }, 0)
      .to('.home-system-orbit--middle', { rotate: -150, ease: 'none' }, 0)
      .to('.home-system-orbit--inner', { rotate: 210, ease: 'none' }, 0)
      .to('.home-system-section__bridge span', { scaleY: 1, ease: 'none' }, 0)
      .to(systemVisual, { '--story-glow': 1, ease: 'none' } as gsap.TweenVars, .05);
  }

  const method = document.querySelector<HTMLElement>('[data-home-method]');
  const methodProgress = document.querySelector<HTMLElement>('[data-method-progress]');
  const methodSteps = gsap.utils.toArray<HTMLElement>('[data-method-step]');

  if (method && methodProgress) {
    gsap.fromTo(methodProgress, { scaleX: 0 }, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: method, start: 'top 70%', end: 'bottom 40%', scrub: 1 },
    });
  }

  methodSteps.forEach((step, index) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 62%',
      end: 'bottom 48%',
      onEnter: () => methodSteps.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex <= index)),
      onEnterBack: () => methodSteps.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex <= index)),
    });
  });

  document.querySelectorAll<HTMLElement>('[data-work-project]').forEach((project) => {
    const image = project.querySelector<HTMLElement>('[data-work-media] img');
    if (!image) return;
    gsap.fromTo(image, { scale: 1.1, yPercent: -4 }, {
      scale: 1.015,
      yPercent: 4,
      ease: 'none',
      scrollTrigger: { trigger: project, start: 'top bottom', end: 'bottom top', scrub: .85 },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-expertise-card]').forEach((card) => {
    const graphic = card.querySelector<HTMLElement>('[data-expertise-graphic]');
    const rotateX = gsap.quickTo(card, 'rotationX', { duration: .55, ease: 'power3.out' });
    const rotateY = gsap.quickTo(card, 'rotationY', { duration: .55, ease: 'power3.out' });
    const moveGraphicX = graphic ? gsap.quickTo(graphic, 'x', { duration: .7, ease: 'power3.out' }) : null;
    const moveGraphicY = graphic ? gsap.quickTo(graphic, 'y', { duration: .7, ease: 'power3.out' }) : null;
    gsap.set(card, { transformPerspective: 950, transformOrigin: 'center center' });

    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--pointer-x', `${x * 100}%`);
      card.style.setProperty('--pointer-y', `${y * 100}%`);
      rotateY((x - .5) * 6.5);
      rotateX((.5 - y) * 6.5);
      moveGraphicX?.((x - .5) * 20);
      moveGraphicY?.((y - .5) * 16);
    };

    const onLeave = () => {
      rotateX(0);
      rotateY(0);
      moveGraphicX?.(0);
      moveGraphicY?.(0);
    };

    card.addEventListener('pointermove', onMove, { passive: true });
    card.addEventListener('pointerleave', onLeave);
    localCleanups.push(() => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    });
  });

  const layers = gsap.utils.toArray<HTMLElement>('[data-depth]');
  const moveX = layers.map((el) => gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }));
  const moveY = layers.map((el) => gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }));
  const onHeroPointer = (event: PointerEvent) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    layers.forEach((el, index) => {
      const depth = Number(el.dataset.depth || 1);
      moveX[index](x * 22 * depth);
      moveY[index](y * 16 * depth);
    });
  };
  hero.addEventListener('pointermove', onHeroPointer, { passive: true });
  localCleanups.push(() => hero.removeEventListener('pointermove', onHeroPointer));

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
    localCleanups.push(() => {
      item.removeEventListener('pointermove', move);
      item.removeEventListener('pointerleave', leave);
    });
  });

  const cursor = document.createElement('div');
  cursor.className = 'home-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.append(cursor);
  const cursorX = gsap.quickTo(cursor, 'x', { duration: .22, ease: 'power3.out' });
  const cursorY = gsap.quickTo(cursor, 'y', { duration: .22, ease: 'power3.out' });
  const onPointerMove = (event: PointerEvent) => { cursorX(event.clientX); cursorY(event.clientY); };
  const interactive = document.querySelectorAll<HTMLElement>('a,button,[data-magnetic],[data-expertise-card],[data-work-project]');
  const enter = () => cursor.classList.add('is-active');
  const leave = () => cursor.classList.remove('is-active');
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  interactive.forEach((el) => {
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
  });
  localCleanups.push(() => {
    window.removeEventListener('pointermove', onPointerMove);
    interactive.forEach((el) => {
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
    });
    cursor.remove();
  });

  const lenis = new Lenis({ duration: 1.02, smoothWheel: true, wheelMultiplier: .9 });
  const onLenisScroll = () => ScrollTrigger.update();
  const ticker = (time: number) => lenis.raf(time * 1000);
  lenis.on('scroll', onLenisScroll);
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);
  localCleanups.push(() => {
    gsap.ticker.remove(ticker);
    lenis.destroy();
  });
};

const createMobileMotion = () => {
  const methodProgress = document.querySelector<HTMLElement>('[data-method-progress]');
  const method = document.querySelector<HTMLElement>('[data-home-method]');
  if (method && methodProgress) {
    gsap.fromTo(methodProgress, { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: method, start: 'top 82%', end: 'bottom 58%', scrub: .8 },
    });
  }
};

if (root && hero) {
  const ctx = gsap.context(() => {
    mm.add(
      {
        desktop: '(min-width: 961px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 960px) and (prefers-reduced-motion: no-preference)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const localCleanups: Cleanup[] = [];
        const conditions = context.conditions as { desktop?: boolean; mobile?: boolean; reduce?: boolean };

        if (conditions.reduce) {
          gsap.set([
            '[data-hero-frame]',
            '[data-hero-detail]',
            '.home-hero__title-line > span',
            '[data-hero-copy]',
            '[data-hero-cta]',
            '[data-hero-network]',
            '[data-hero-node]',
            '[data-system-step]',
            '[data-method-step]',
          ], { clearProps: 'all' });
          activateSystemStage(3);
          return () => localCleanups.forEach((cleanup) => cleanup());
        }

        createCinematicHero(localCleanups);

        if (conditions.desktop) createDesktopInteractions(localCleanups);
        if (conditions.mobile) createMobileMotion();

        return () => localCleanups.forEach((cleanup) => cleanup());
      },
    );
  }, root);

  globalCleanups.push(() => ctx.revert());
}

const revealCleanup = initScrollReveals(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
if (revealCleanup) globalCleanups.push(revealCleanup);

const cleanupAll = () => {
  globalCleanups.splice(0).forEach((cleanup) => cleanup());
  mm.revert();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

document.addEventListener('astro:before-swap', cleanupAll, { once: true });
