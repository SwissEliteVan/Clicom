import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initScrollReveals } from './scroll-motion';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector<HTMLElement>('[data-hero]');
const frame = document.querySelector<HTMLElement>('[data-hero-frame]');
const media = document.querySelector<HTMLElement>('[data-hero-media]');
const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-canvas]');

if (!reduce.matches && hero && frame && media) {
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

if (!reduce.matches && canvas && media) {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (ctx) {
    let width = 0, height = 0, raf = 0, time = 0;
    let targetX = .62, targetY = .42, mouseX = targetX, mouseY = targetY;
    const resize = () => { const dpr = Math.min(devicePixelRatio, 1.5); width = media.clientWidth; height = media.clientHeight; canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr); canvas.style.width=`${width}px`; canvas.style.height=`${height}px`; ctx.setTransform(dpr,0,0,dpr,0,0); };
    const draw = () => {
      time += .006; mouseX += (targetX-mouseX)*.025; mouseY += (targetY-mouseY)*.025;
      ctx.clearRect(0,0,width,height);
      const glow=ctx.createRadialGradient(mouseX*width,mouseY*height,0,mouseX*width,mouseY*height,width*.58);
      glow.addColorStop(0,'rgba(36,87,255,.42)'); glow.addColorStop(.42,'rgba(18,55,137,.18)'); glow.addColorStop(1,'rgba(8,17,38,0)'); ctx.fillStyle=glow; ctx.fillRect(0,0,width,height);
      for(let line=0;line<16;line++){
        const offset=(line-8)*height*.041; ctx.beginPath();
        for(let x=-40;x<=width+40;x+=22){ const p=x/width; const base=height*(.78-p*.48)+offset; const wave=Math.sin(p*7+time*5+line*.23)*18 + Math.sin(p*2.6-time*2)*24; const pull=Math.exp(-Math.pow((p-mouseX)*3.1,2))*(mouseY-.5)*72; const y=base+wave+pull; x===-40?ctx.moveTo(x,y):ctx.lineTo(x,y); }
        const grad=ctx.createLinearGradient(0,0,width,0); grad.addColorStop(0,'rgba(36,87,255,0)'); grad.addColorStop(.48,`rgba(36,87,255,${.07+line*.004})`); grad.addColorStop(1,'rgba(34,211,238,.24)'); ctx.strokeStyle=grad; ctx.lineWidth=line===8?1.8:.72; ctx.stroke();
      }
      for(let i=0;i<34;i++){ const p=(i/34+time*.09)%1; const x=p*width; const y=height*(.78-p*.48)+Math.sin(p*7+time*5+8*.23)*18; ctx.fillStyle=i%5===0?'rgba(34,211,238,.82)':'rgba(255,255,255,.36)'; ctx.beginPath(); ctx.arc(x,y,i%5===0?2.3:1.1,0,Math.PI*2); ctx.fill(); }
      raf=requestAnimationFrame(draw);
    };
    const observer=new ResizeObserver(resize); observer.observe(media); resize(); media.classList.add('is-canvas-ready'); draw();
    hero?.addEventListener('pointermove',(event)=>{ targetX=event.clientX/innerWidth; targetY=event.clientY/innerHeight; },{passive:true});
    document.addEventListener('astro:before-swap',()=>{ cancelAnimationFrame(raf); observer.disconnect(); },{once:true});
  }
}

initScrollReveals(reduce.matches);
