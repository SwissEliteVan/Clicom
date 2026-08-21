import { gsap } from './motion/core';
import { motion } from './motion/tokens';

export const initScrollReveals = (reduced = false) => {
  const groups = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (reduced) { gsap.set(groups, { clearProps: 'all' }); return; }
  groups.forEach((group) => {
    const children = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
    gsap.from(children.length ? children : group, {
      y: motion.distance.large, opacity: 0, duration: motion.duration.narrative, stagger: .1, ease: motion.ease.reveal,
      scrollTrigger: { trigger: group, start: 'top 84%', once: true }
    });
  });
};
