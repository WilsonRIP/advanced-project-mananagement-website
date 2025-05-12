// General fade variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }, // smooth custom cubic-bezier
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

// Slide-in factories (direction, distance, duration)
export const slideIn = (
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  distance = 50,
  duration = 0.6
) => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const sign = direction === 'left' || direction === 'up' ? -1 : 1;
  return {
    initial: { opacity: 0, [axis]: sign * distance },
    animate: {
      opacity: 1,
      [axis]: 0,
      transition: { duration, ease: [0.43, 0.13, 0.23, 0.96] },
    },
    exit: {
      opacity: 0,
      [axis]: sign * distance,
      transition: { duration: duration * 0.7, ease: 'easeInOut' },
    },
  };
};

// Pop-up / zoom variants
export const popUp = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const zoomIn = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: { duration: 0.5, ease: 'backOut' },
  },
  exit: {
    scale: 0,
    transition: { duration: 0.4, ease: 'backIn' },
  },
};

// Continuous spin / attention getters
export const spin = {
  animate: {
    rotate: 360,
    transition: { repeat: Infinity, ease: 'linear', duration: 2 },
  },
};

// Bounce / jiggle
export const bounce = {
  animate: {
    y: [0, -10, 0],
    transition: { repeat: Infinity, repeatType: 'loop', duration: 0.6, ease: 'easeInOut' },
  },
};

// Stagger container factory
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
) => ({
  initial: {},
  animate: {
    transition: { staggerChildren, delayChildren },
  },
});

// Hover effects
export const cardHoverEffect = {
  whileHover: {
    scale: 1.04,
    boxShadow: "0px 20px 30px rgba(0,0,0,0.12)",
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
};

export const subtleButtonHover = {
  whileHover: {
    scale: 1.08,
    transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] },
  },
};

// Example usage of slideIn
// <motion.div variants={slideIn('left', 100, 0.8)} initial="initial" animate="animate" exit="exit">
