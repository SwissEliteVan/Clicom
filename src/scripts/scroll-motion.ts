import gsap from 'gsap';

export const initScrollReveals = (reduced = false) => {
  const groups = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (reduced) { gsap.set(groups, { clearProps: 'all' }); return; }
  groups.forEach((group) => {
    const children = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
    gsap.from(children.length ? children : group, {
      y: 42, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out',
      scrollTrigger: { trigger: group, start: 'top 84%', once: true }
    });
  });
};
