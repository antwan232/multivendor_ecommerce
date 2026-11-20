import type { TargetAndTransition, Transition, Variants } from "motion/react";

export const compareColumnSpring: Transition = {
	type: "spring",
	stiffness: 360,
	damping: 34,
	mass: 0.9,
};

export const compareReveal: Variants = {
	hidden: { opacity: 0, y: 16 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 260, damping: 28 },
	},
};

export const compareStagger: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export function formatComparePrice(value: number): string {
	return `$${value.toFixed(2)}`;
}

export function isOptimizableCompareImage(src: string | null): boolean {
	if (!src || !/^https?:\/\//i.test(src)) return true;

	return src.includes("res.cloudinary.com") || src.includes("img.clerk.com");
}

export const faqSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 19,
  mass: 0.9,
};

export const FAQ_EASE = [0.22, 1, 0.36, 1] as const;

export const heroSequence: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: faqSpring },
};

export const rowsSequence: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

export const rowItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: FAQ_EASE },
  },
};

export const reducedRowsSequence: Variants = {
  hidden: {},
  show: { transition: { duration: 0, staggerChildren: 0, delayChildren: 0 } },
};

export const reducedRowItem: Variants = {
  hidden: { opacity: 0, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const topBarEntrance: TargetAndTransition = {
  y: [-10, 0],
  opacity: [0, 1],
  transition: { duration: 0.7 },
};

export const supportIconMotion: TargetAndTransition = {
  rotate: [15, 0],
  transition: {
    type: "spring",
    stiffness: 1500,
    damping: 5,
    repeat: Infinity,
    repeatType: "reverse",
  },
};

export const scanQrMotion: TargetAndTransition = {
  scale: 1.15,
  y: [-100, 0],
  opacity: [0, 1],
  transition: {
    delay: 0.3,
    duration: 0.5,
    scale: {
      type: "spring",
      repeat: Infinity,
      repeatDelay: 0.5,
      repeatType: "mirror",
      stiffness: 600,
      damping: 5,
    },
  },
};

export const discountTextMotion: TargetAndTransition = {
  x: [-10, 0],
  opacity: [0, 1],
  transition: { duration: 0.8, delay: 0.3 },
};

export const discountBadgeMotion: TargetAndTransition = {
  y: [-50, 0],
  opacity: [0, 1],
  transition: { type: "spring", stiffness: 700, damping: 15, delay: 1 },
};

export const discountTodayMotion: TargetAndTransition = {
  opacity: [0, 1],
  transition: { delay: 1.6 },
};

export const searchLabelTransition = (isFocused: boolean): Transition => ({
  duration: isFocused ? 0.2 : 0.1,
  ease: "linear",
});

export const searchResultsMotion: TargetAndTransition = {
  opacity: [0, 1],
  rotateX: [180, 0],
};

export const searchResultsTransition: Transition = {
  damping: 20,
  stiffness: 500,
  type: "spring",
};

export const searchResultsExit: TargetAndTransition = {
  opacity: 0,
  transition: { type: "keyframes" },
};

export const drawerSpring: Transition = {
  type: "spring",
  damping: 15,
  stiffness: 300,
};

export const cartOverlayMotion = {
  initial: { opacity: 0, zIndex: -99999 },
  animate: { opacity: 1, zIndex: 9999 },
  exit: { opacity: 0, zIndex: -99999 },
} satisfies {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
};

export const cartOverviewPanelMotion = {
  initial: { opacity: 0, x: 300, zIndex: -99999 },
  animate: { opacity: 1, x: 0, zIndex: 9955599 },
  exit: { opacity: 0, x: 300, zIndex: -99999 },
} satisfies {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
};

export const cartDrawerPanelMotion = {
  initial: { opacity: 0, x: 300, zIndex: -99999 },
  animate: { opacity: 1, x: 0, zIndex: 9999 },
  exit: {
    opacity: 0,
    x: 300,
    zIndex: -99999,
    transition: { duration: 0.1 },
  },
} satisfies {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
};

export const cartLineItemVariants: Variants = {
  hover: { borderColor: "var(--color-gray-500)" },
};

export const cartLineItemImageVariants: Variants = {
  hover: { scale: 1.1 },
};

export const categoryTriggerVariants: Variants = {
  hover: {
    backgroundColor: "var(--color-primary-darker)",
    transition: { type: "spring" },
  },
};

export const categoryArrowVariants: Variants = {
  hover: { rotate: 180 },
};

export const heroFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const heroBadgePulse = {
  animate: { opacity: [1, 0.5, 1] },
  transition: {
    duration: 2,
    times: [0, 0.5, 1],
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export const heroCtaVariants: Variants = {
  rest: { backgroundColor: "#078178" },
  hover: {
    backgroundColor: "#005249",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const heroCtaIconVariants: Variants = {
  rest: { rotate: -45 },
  hover: {
    rotate: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export const heroDotTransition: Transition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1],
};

export const heroArrowVariants: Variants = {
  rest: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#ffffff" },
  hover: {
    backgroundColor: "#078178",
    color: "#05535c",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const springSettle: Transition = {
	type: "spring",
	stiffness: 110,
	damping: 18,
	mass: 0.9,
};

export const springPop: Transition = {
	type: "spring",
	stiffness: 320,
	damping: 22,
	mass: 0.7,
};

export const staggerContainer = (
	stagger = 0.07,
	delay = 0.05,
): Variants => ({
	hidden: {},
	show: {
		transition: { staggerChildren: stagger, delayChildren: delay },
	},
});

export const staggerItem: Variants = {
	hidden: { opacity: 0, y: 30, scale: 0.965, rotate: -0.8 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		rotate: 0,
		transition: springSettle,
	},
};

export const staggerHeading: Variants = {
	hidden: { opacity: 0, x: -26 },
	show: { opacity: 1, x: 0, transition: springSettle },
};

export const popIn: Variants = {
	hidden: { opacity: 0, scale: 0.7, y: 8 },
	show: { opacity: 1, scale: 1, y: 0, transition: springPop },
};

export const imageReveal: Variants = {
	hidden: { opacity: 0, scale: 1.06 },
	show: { opacity: 1, scale: 1, transition: { ...springSettle, delay: 0.05 } },
};

