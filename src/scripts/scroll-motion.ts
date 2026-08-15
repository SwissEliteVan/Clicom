import gsap from 'gsap';

export const initScrollReveals = (reduced = false) => {
  const groups = gsap.utils.toArray<HTMLElement>('[data-reveal]');

  if (reduced) {
    gsap.set(groups, { clearProps: 'all' });
    groups.forEach((group) => gsap.set(group.querySelectorAll('[data-reveal-item]'), { clearProps: 'all' }));
    return;
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
      gsap.from(targets, { ...base, y: 26, opacity: 0, clipPath: 'inset(0 0 18% 0)' });
      return;
    }

    if (type === 'scale') {
      gsap.from(targets, { ...base, y: 24, opacity: 0, scale: .965, duration: 1.12 });
      return;
    }

    if (type === 'slide') {
      gsap.from(targets, { ...base, x: 34, opacity: 0, duration: .92 });
      return;
    }

    gsap.from(targets, { ...base, y: 42, opacity: 0 });
  });
};
