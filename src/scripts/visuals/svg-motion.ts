import gsap from 'gsap';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll<HTMLElement>('[data-visual-motion]:not([data-visual-ready])').forEach((visual) => {
  visual.dataset.visualReady = 'true';
  if (reduce) return;
  const paths = visual.querySelectorAll<SVGPathElement>('[data-visual-path]');
  const nodes = visual.querySelectorAll<SVGElement | HTMLElement>('[data-visual-node]');
  paths.forEach((path) => { const length = path.getTotalLength?.() || 800; gsap.set(path, { strokeDasharray: length, strokeDashoffset: length }); });
  gsap.set(nodes, { opacity: 0, scale: .82, transformOrigin: 'center' });
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    gsap.timeline({ defaults: { ease: 'power3.out' } }).to(paths, { strokeDashoffset: 0, duration: 1.6, stagger: .08 }).to(nodes, { opacity: 1, scale: 1, duration: .65, stagger: .09 }, .2);
    observer.disconnect();
  }, { threshold: .22 });
  observer.observe(visual);
  document.addEventListener('astro:before-swap', () => observer.disconnect(), { once: true });
});
