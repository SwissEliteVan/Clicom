import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initScrollReveals } from './scroll-motion';

gsap.registerPlugin(ScrollTrigger);

const hero = document.querySelector<HTMLElement>('[data-hero]');
const cleanups: Array<() => void> = [];
const addCleanup = (fn: () => void) => cleanups.push(fn);
const mm = gsap.matchMedia();

const activateSystemStage = (index: number) => {
  const steps = gsap.utils.toArray<HTMLElement>('[data-system-step]');
  const channels = gsap.utils.toArray<HTMLElement>('[data-system-channel]');
  const flows = gsap.utils.toArray<SVGPathElement>('[data-system-flow]');
  const status = document.querySelector<HTMLElement>('[data-system-status]');
  const labels = ['01 / ATTIRER', '02 / CONVERTIR', '03 / SUIVRE', '04 / OPTIMISER'];

  steps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === index));
  channels.forEach((channel) => {
    const channelIndex = Number(channel.dataset.systemChannel || 0);
    gsap.to(channel, {
      opacity: channelIndex <= index ? 1 : .24,
      scale: channelIndex === index ? 1.05 : 1,
      duration: .45,
      ease: 'power3.out',
    });
  });
  flows.forEach((flow) => {
    const flowIndex = Number(flow.dataset.systemFlow || 0);
    gsap.to(flow, {
      strokeDashoffset: flowIndex <= index ? 0 : 1,
      opacity: flowIndex <= index ? 1 : .18,
      duration: .7,
      ease: 'power2.inOut',
    });
  });
  if (status) status.textContent = labels[index] ?? labels[0];

  gsap.to('[data-system-core]', {
    scale: 1 + index * .025,
    rotate: index * 3,
    duration: .6,
    ease: 'power3.out',
  });
};

if (hero) {
  mm.add(
    {
      desktop: '(min-width: 961px) and (prefers-reduced-motion: no-preference)',
      mobile: '(max-width: 960px) and (prefers-reduced-motion: no-preference)',
      reduce: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { desktop, mobile, reduce } = context.conditions as {
        desktop: boolean;
        mobile: boolean;
        reduce: boolean;
      };

      if (reduce) {
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
        return;
      }

      const frame = hero.querySelector<HTMLElement>('[data-hero-frame]');
      const connections = gsap.utils.toArray<SVGPathElement>('[data-hero-connection]');
      const nodes = gsap.utils.toArray<HTMLElement>('[data-hero-node]');

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      if (frame) intro.from(frame, { opacity: 0, scale: 1.1, duration: 1.45 });

      intro
        .from('[data-hero-network]', { opacity: 0, scale: .92, filter: 'blur(18px)', duration: .9 }, .12)
        .from('[data-hero-detail]', { opacity: 0, y: 18, duration: .7, stagger: .08 }, .2)
        .from(nodes, { opacity: 0, scale: .6, filter: 'blur(8px)', duration: .6, stagger: .07 }, .38)
        .to(connections, { strokeDashoffset: 0, duration: 1.15, stagger: .08, ease: 'power2.inOut' }, .48)
        .from('.home-hero__title-line > span', {
          yPercent: 116,
          rotate: 2.5,
          filter: 'blur(10px)',
          duration: 1.12,
          stagger: .09,
        }, .48)
        .from('[data-hero-copy]', { opacity: 0, y: 26, duration: .78 }, 1.02)
        .from('[data-hero-cta]', { opacity: 0, y: 24, scale: .96, duration: .76 }, 1.12)
        .from('.home-hero__ticker', { opacity: 0, y: 20, duration: .7 }, 1.28);

      if (desktop) {
        const heroScroll = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: .8,
          },
        });

        heroScroll
          .to('[data-hero-frame]', { scale: .93, yPercent: 6, opacity: .65, ease: 'none' }, 0)
          .to('.home-hero__title', { yPercent: -11, opacity: .16, ease: 'none' }, 0)
          .to('.home-hero__support', { yPercent: -20, opacity: .08, ease: 'none' }, 0)
          .to('.home-hero__visual', { yPercent: 12, scale: .94, rotate: .4, ease: 'none' }, 0)
          .to('.home-hero__ticker', { yPercent: 100, ease: 'none' }, .55);

        const systemSteps = gsap.utils.toArray<HTMLElement>('[data-system-step]');
        if (systemSteps.length) {
          activateSystemStage(0);
          systemSteps.forEach((step, index) => {
            ScrollTrigger.create({
              trigger: step,
              start: 'top 56%',
              end: 'bottom 44%',
              onEnter: () => activateSystemStage(index),
              onEnterBack: () => activateSystemStage(index),
            });
          });
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
            onEnter: () => {
              methodSteps.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex <= index));
            },
            onEnterBack: () => {
              methodSteps.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex <= index));
            },
          });
        });

        document.querySelectorAll<HTMLElement>('[data-work-project]').forEach((project) => {
          const media = project.querySelector<HTMLElement>('[data-work-media]');
          const image = media?.querySelector<HTMLElement>('img');
          if (!image) return;
          gsap.fromTo(image, { scale: 1.08, yPercent: -3 }, {
            scale: 1.02,
            yPercent: 3,
            ease: 'none',
            scrollTrigger: { trigger: project, start: 'top bottom', end: 'bottom top', scrub: .8 },
          });
        });

        document.querySelectorAll<HTMLElement>('[data-expertise-card]').forEach((card) => {
          const graphic = card.querySelector<HTMLElement>('[data-expertise-graphic]');
          const rotateX = gsap.quickTo(card, 'rotationX', { duration: .55, ease: 'power3.out' });
          const rotateY = gsap.quickTo(card, 'rotationY', { duration: .55, ease: 'power3.out' });
          const moveGraphicX = graphic ? gsap.quickTo(graphic, 'x', { duration: .7, ease: 'power3.out' }) : null;
          const moveGraphicY = graphic ? gsap.quickTo(graphic, 'y', { duration: .7, ease: 'power3.out' }) : null;
          gsap.set(card, { transformPerspective: 900, transformOrigin: 'center center' });

          const onMove = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            card.style.setProperty('--pointer-x', `${x * 100}%`);
            card.style.setProperty('--pointer-y', `${y * 100}%`);
            rotateY((x - .5) * 4.5);
            rotateX((.5 - y) * 4.5);
            moveGraphicX?.((x - .5) * 14);
            moveGraphicY?.((y - .5) * 12);
          };
          const onLeave = () => {
            rotateX(0);
            rotateY(0);
            moveGraphicX?.(0);
            moveGraphicY?.(0);
          };

          card.addEventListener('pointermove', onMove, { passive: true });
          card.addEventListener('pointerleave', onLeave);
          addCleanup(() => {
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
            moveX[index](x * 18 * depth);
            moveY[index](y * 14 * depth);
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
        const interactive = document.querySelectorAll<HTMLElement>('a,button,[data-magnetic],[data-expertise-card],[data-work-project]');
        const enter = () => cursor.classList.add('is-active');
        const leave = () => cursor.classList.remove('is-active');
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        interactive.forEach((el) => {
          el.addEventListener('pointerenter', enter);
          el.addEventListener('pointerleave', leave);
        });
        addCleanup(() => {
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
        addCleanup(() => {
          gsap.ticker.remove(ticker);
          lenis.destroy();
        });
      }

      if (mobile) {
        const methodProgress = document.querySelector<HTMLElement>('[data-method-progress]');
        const method = document.querySelector<HTMLElement>('[data-home-method]');
        if (method && methodProgress) {
          gsap.fromTo(methodProgress, { scaleY: 0 }, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: method, start: 'top 80%', end: 'bottom 55%', scrub: .8 },
          });
        }
      }
    },
  );
}

const revealCleanup = initScrollReveals(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
if (revealCleanup) addCleanup(revealCleanup);

const cleanupAll = () => {
  cleanups.splice(0).forEach((cleanup) => cleanup());
  mm.revert();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

document.addEventListener('astro:before-swap', cleanupAll, { once: true });
