const root = document.documentElement;
root.classList.add('js');

const hero = document.querySelector<HTMLElement>('[data-hero]');
const media = document.querySelector<HTMLElement>('[data-hero-media]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let scrollFrame = 0;
let pointerFrame = 0;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const setHeroProgress = () => {
  if (!hero) return;
  scrollFrame = 0;
  const rect = hero.getBoundingClientRect();
  const progress = clamp((-rect.top) / Math.max(rect.height * 0.62, 1), 0, 1);
  hero.style.setProperty('--hero-scroll', progress.toFixed(3));
};

const scheduleScroll = () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(setHeroProgress);
};

const ready = () => {
  if (!hero) return;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      hero?.classList.add('is-ready');
      setHeroProgress();
    });
  });
};

if (hero && !reducedMotion) {
  setHeroProgress();
  window.addEventListener('scroll', scheduleScroll, { passive: true });
}

ready();

if (hero && !reducedMotion && media && window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024) {
  const updatePointer = (x: number, y: number) => {
    pointerFrame = 0;
    const rect = media.getBoundingClientRect();
    const mx = clamp(((x - rect.left) / rect.width - 0.5) * 2, -1, 1);
    const my = clamp(((y - rect.top) / rect.height - 0.5) * 2, -1, 1);
    hero.style.setProperty('--mx', mx.toFixed(3));
    hero.style.setProperty('--my', my.toFixed(3));
  };

  media.addEventListener('pointermove', (event) => {
    if (pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(() => updatePointer(event.clientX, event.clientY));
  });

  media.addEventListener('pointerleave', () => {
    hero.style.setProperty('--mx', '0');
    hero.style.setProperty('--my', '0');
  });
}

if (reducedMotion) {
  hero?.style.setProperty('--hero-scroll', '0');
  hero?.style.setProperty('--mx', '0');
  hero?.style.setProperty('--my', '0');
}
