import { gsap } from './motion/core';
import { motion } from './motion/tokens';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  gsap.from('[data-work-media]', {clipPath:'inset(0 0 100% 0 round 28px)',y:34,duration:1.15,ease:'power3.out',stagger:.18,scrollTrigger:{trigger:'[data-work-section]',start:'top 72%',once:true}});
  gsap.to('[data-method-progress]', {scaleX:1,ease:motion.ease.linear,scrollTrigger:{trigger:'[data-home-method]',start:'top 75%',end:'bottom 55%',scrub:motion.scrub.standard}});
}
