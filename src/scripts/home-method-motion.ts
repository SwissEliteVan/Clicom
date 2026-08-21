import { gsap, ScrollTrigger } from './motion/core';
import { bindAstroMotionCleanup } from './motion/lifecycle';
import { motion } from './motion/tokens';

const section = document.querySelector<HTMLElement>('[data-home-method]');
if (section) initialiseMethod(section);

function initialiseMethod(root: HTMLElement) {
  const context = gsap.context(() => {
    const media = gsap.matchMedia();
    const progressLine = root.querySelector<HTMLElement>('[data-method-progress]');
    const steps = gsap.utils.toArray<HTMLElement>('[data-method-step]', root);

    const updateSteps = (progress: number) => {
      // 4 steps distributed at progress intervals: 0..0.25, 0.25..0.50, 0.50..0.75, 0.75..1.0
      const activeIndex = Math.min(steps.length - 1, Math.floor(progress * 3.99));
      steps.forEach((step, i) => {
        const isCurrent = i === activeIndex;
        const isPast = i < activeIndex;
        step.classList.toggle('is-active', isCurrent);
        step.classList.toggle('is-past', isPast);
      });
    };

    media.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
      if (progressLine) gsap.set(progressLine, { scaleX: 0 });

      ScrollTrigger.create({
        trigger: root,
        start: 'top 75%',
        end: 'bottom 55%',
        scrub: motion.scrub.standard,
        onUpdate: (self) => {
          if (progressLine) {
            gsap.set(progressLine, { scaleX: self.progress });
          }
          updateSteps(self.progress);
        },
      });
    });

    media.add('(max-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 80%',
          onEnter: () => {
            step.classList.add('is-active');
            for (let j = 0; j < index; j++) {
              steps[j]?.classList.add('is-past');
              steps[j]?.classList.remove('is-active');
            }
          },
          onLeaveBack: () => {
            if (index > 0) step.classList.remove('is-active');
            if (index > 0 && steps[index - 1]) steps[index - 1]?.classList.add('is-active');
          },
        });
      });
    });

    media.add('(prefers-reduced-motion: reduce)', () => {
      if (progressLine) gsap.set(progressLine, { scaleX: 1 });
      steps.forEach((step) => {
        step.classList.add('is-active');
      });
    });

    return () => media.revert();
  }, root);

  bindAstroMotionCleanup(root, context);
}
