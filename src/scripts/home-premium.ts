import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const system = document.querySelector<HTMLElement>('[data-system-story]');
if (system) {
  const steps = gsap.utils.toArray<HTMLElement>('[data-system-step]');
  const media = gsap.utils.toArray<HTMLElement>('[data-system-media]');
  const status = system.querySelector<HTMLElement>('[data-system-status]');
  const activate = (index: number) => {
    steps.forEach((step, i) => { step.classList.toggle('is-active', i === index); step.classList.toggle('is-past', i < index); });
    media.forEach((item, i) => item.classList.toggle('is-active', i === index));
    if (status) status.textContent = `${String(index + 1).padStart(2,'0')} / ${steps[index]?.querySelector('small')?.textContent || ''}`;
  };
  if (!reduced) steps.forEach((step,index) => ScrollTrigger.create({trigger:step,start:'top 56%',end:'bottom 44%',onEnter:()=>activate(index),onEnterBack:()=>activate(index)}));
}

if (!reduced) {
  gsap.from('[data-work-media]', {clipPath:'inset(0 0 100% 0 round 28px)',y:34,duration:1.15,ease:'power3.out',stagger:.18,scrollTrigger:{trigger:'[data-work-section]',start:'top 72%',once:true}});
  gsap.to('[data-method-progress]', {scaleX:1,ease:'none',scrollTrigger:{trigger:'[data-home-method]',start:'top 75%',end:'bottom 55%',scrub:.7}});
}
