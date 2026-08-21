export const motion = {
  duration: {
    micro: 0.08,
    fast: 0.2,
    standard: 0.35,
    reveal: 0.65,
    narrative: 1,
  },
  ease: {
    standard: 'power2.out',
    reveal: 'power3.out',
    linear: 'none',
  },
  distance: {
    subtle: 8,
    reveal: 18,
    large: 42,
  },
  scrub: {
    standard: 0.7,
    smooth: 0.75,
    deliberate: 0.8,
  },
} as const;
