import type { Transition, Variants } from "framer-motion";

export const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const standardTransition: Transition = {
  duration: 0.75,
  ease: premiumEase,
};

export const quickTransition: Transition = {
  duration: 0.35,
  ease: premiumEase,
};

export const makeFadeUp = (distance = 24, blur = 6): Variants => ({
  hidden: {
    opacity: 0,
    y: distance,
    filter: `blur(${blur}px)`,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: standardTransition,
  },
});

export const softFade: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: premiumEase } },
};

export const navbarIntro: Variants = {
  hidden: { opacity: 0, y: -14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: premiumEase },
  },
};

export const buttonHover = {
  y: -2,
  scale: 1.014,
  transition: quickTransition,
};

export const buttonTap = {
  y: 0,
  scale: 0.988,
  transition: { duration: 0.2, ease: premiumEase },
};

export const cardHover = {
  y: -4,
  scale: 1.006,
  transition: quickTransition,
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
};
