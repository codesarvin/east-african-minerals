export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const iosEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

export const iosSpring = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 30,
};

export const iosSpringGentle = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 24,
};

export const iosSpringSnappy = {
  type: 'spring' as const,
  stiffness: 460,
  damping: 28,
};

export const fadeOffsets = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
} as const;

export type FadeDirection = keyof typeof fadeOffsets;

