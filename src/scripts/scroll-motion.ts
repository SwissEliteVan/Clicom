import gsap from 'gsap';

export const initScrollReveals = (reduced = false) => {
  const groups = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  const animations: gsap.core.Tween[] = [];

  if (reduced) {
    gsap.set(groups, { clearProps: 'all' });
    groups.forEach((group) => gsap.set(group.querySelectorAll('[data-reveal-item]'), { clearProps: 'all' }));
    return () => undefined;
  }

  groups.forEach((group) => {
    const type = group.dataset.revealType || 'default';
    const children = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
    const targets = children.length ? Array.from(children) : [group];

    const base = {
      duration: 1,
      stagger: children.length ? .09 : 0,
      ease: 'power3.out',
      scrollTrigger: { trigger: group, start: 'top 84%', once: true },
    };

    if (type === 'clip') {
      animations.push(gsap.from(targets, {
        ...base,
        y: 28,
        opacity: 0,
        clipPath: 'inset(0 0 22% 0 round 18px)',
        filter: 'blur(5px)',
      }));
      return;
    }

    if (type === 'scale') {
      animations.push(gsap.from(targets, {
        ...base,
        y: 26,
        opacity: 0,
        scale: .95,
        filter: 'blur(6px)',
        duration: 1.14,
      }));
      return;
    }

    if (type === 'slide') {
      animations.push(gsap.from(targets, {
        ...base,
        x: 38,
        opacity: 0,
        filter: 'blur(4px)',
        duration: .94,
      }));
      return;
    }

    animations.push(gsap.from(targets, {
      ...base,
      y: 44,
      opacity: 0,
      filter: 'blur(4px)',
    }));
  });

  return () => {
    animations.forEach((animation) => {
      animation.scrollTrigger?.kill();
      animation.kill();
    });
  };
};
