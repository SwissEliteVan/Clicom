import { gsap } from '../motion/core';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll<HTMLElement>('[data-visual-motion]:not([data-visual-ready])').forEach((visual) => {
  visual.dataset.visualReady = 'true';
  if (reduce) return;
  const paths = visual.querySelectorAll<SVGPathElement>('[data-visual-path]');
  const nodes = visual.querySelectorAll<SVGElement | HTMLElement>('[data-visual-node]');
  paths.forEach((path) => { const length=path.getTotalLength?.()||800; gsap.set(path,{strokeDasharray:length,strokeDashoffset:length}); });
  gsap.set(nodes,{opacity:0,scale:.88,transformOrigin:'center'});
  let revealed=false;
  const sync = (visible:boolean) => {
    const active=visible&&document.visibilityState==='visible';
    visual.classList.toggle('is-visual-active',active);
    if(active&&!revealed){revealed=true;gsap.timeline({defaults:{ease:'power3.out'}}).to(paths,{strokeDashoffset:0,duration:.8,stagger:.06}).to(nodes,{opacity:1,scale:1,duration:.7,stagger:.08},.12);}
  };
  let intersecting=false;
  const observer=new IntersectionObserver(([entry])=>{intersecting=entry.isIntersecting;sync(intersecting);},{threshold:.18,rootMargin:'40px'});
  const onVisibility=()=>sync(intersecting);
  observer.observe(visual); document.addEventListener('visibilitychange',onVisibility);
  document.addEventListener('astro:before-swap',()=>{observer.disconnect();document.removeEventListener('visibilitychange',onVisibility);gsap.killTweensOf([paths,nodes]);},{once:true});
});
