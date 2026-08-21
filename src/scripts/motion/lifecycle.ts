import { gsap, ScrollTrigger } from './core';

type Cleanup = () => void;
type MotionContext = ReturnType<typeof gsap.context>;

export function bindAstroMotionCleanup(
  root: HTMLElement,
  context: MotionContext,
  beforeRevert?: Cleanup,
) {
  let active = true;

  const cleanup = () => {
    if (!active) return;
    active = false;
    beforeRevert?.();
    context.revert();
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.trigger && root.contains(trigger.trigger as Node))
      .forEach((trigger) => trigger.kill());
    document.removeEventListener('astro:before-swap', cleanup);
  };

  // Processed Astro scripts run in the browser; this hook also keeps the
  // modules safe if client-side routing is enabled later.
  document.addEventListener('astro:before-swap', cleanup, { once: true });
  return cleanup;
}
