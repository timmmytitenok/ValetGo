"use client";

import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import styles from "./border-glow.module.css";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

type AnimationArgs = {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (value: number) => number;
  onUpdate: (value: number) => void;
  onEnd?: () => void;
};

const DEFAULT_COLORS = ["#c084fc", "#f472b6", "#38bdf8"];
const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const GRADIENT_KEYS = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function parseHSL(hsl: string) {
  const match = hsl.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: Number.parseFloat(match[1]), s: Number.parseFloat(match[2]), l: Number.parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars: Record<string, string> = {};

  for (let i = 0; i < opacities.length; i += 1) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }

  return vars;
}

function buildGradientVars(colors: string[]) {
  const palette = colors.length ? colors : DEFAULT_COLORS;
  const vars: Record<string, string> = {};

  for (let i = 0; i < 7; i += 1) {
    const color = palette[Math.min(COLOR_MAP[i], palette.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${color} 0px, transparent 50%)`;
  }

  vars["--gradient-base"] = `linear-gradient(${palette[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

function easeInCubic(value: number) {
  return value ** 3;
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: AnimationArgs) {
  let frameId = 0;
  const startAt = performance.now() + delay;

  const tick = (now: number) => {
    if (now < startAt) {
      frameId = requestAnimationFrame(tick);
      return;
    }

    const t = Math.min((now - startAt) / duration, 1);
    onUpdate(start + (end - start) * ease(t));

    if (t < 1) {
      frameId = requestAnimationFrame(tick);
      return;
    }

    onEnd?.();
  };

  frameId = requestAnimationFrame(tick);

  return () => {
    if (frameId) cancelAnimationFrame(frameId);
  };
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120F17",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = DEFAULT_COLORS,
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const getCenterOfElement = useCallback((element: HTMLElement) => {
    const { width, height } = element.getBoundingClientRect();
    return [width / 2, height / 2] as const;
  }, []);

  const getEdgeProximity = useCallback(
    (element: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(element);
      const dx = x - cx;
      const dy = y - cy;
      const kx = dx !== 0 ? cx / Math.abs(dx) : Number.POSITIVE_INFINITY;
      const ky = dy !== 0 ? cy / Math.abs(dy) : Number.POSITIVE_INFINITY;
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement],
  );

  const getCursorAngle = useCallback(
    (element: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(element);
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    },
    [getCenterOfElement],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);

      card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
      card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
    },
    [getCursorAngle, getEdgeProximity],
  );

  useEffect(() => {
    if (!animated || !cardRef.current) return;

    const card = cardRef.current;
    const angleStart = 110;
    const angleEnd = 465;

    card.dataset.sweepActive = "true";
    card.style.setProperty("--cursor-angle", `${angleStart}deg`);

    const stopEdgeIn = animateValue({
      duration: 500,
      onUpdate: (value) => card.style.setProperty("--edge-proximity", value.toFixed(3)),
    });
    const stopAngleIn = animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: (value) => {
        const angle = (angleEnd - angleStart) * (value / 100) + angleStart;
        card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
      },
    });
    const stopAngleOut = animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (value) => {
        const angle = (angleEnd - angleStart) * (value / 100) + angleStart;
        card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
      },
    });
    const stopEdgeOut = animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (value) => card.style.setProperty("--edge-proximity", value.toFixed(3)),
      onEnd: () => {
        card.dataset.sweepActive = "false";
      },
    });

    return () => {
      stopEdgeIn();
      stopAngleIn();
      stopAngleOut();
      stopEdgeOut();
      card.dataset.sweepActive = "false";
    };
  }, [animated]);

  const style = useMemo(() => {
    return {
      "--card-bg": backgroundColor,
      "--edge-sensitivity": edgeSensitivity,
      "--border-radius": `${borderRadius}px`,
      "--glow-padding": `${glowRadius}px`,
      "--cone-spread": coneSpread,
      "--fill-opacity": fillOpacity,
      ...buildGlowVars(glowColor, glowIntensity),
      ...buildGradientVars(colors),
    } as CSSProperties;
  }, [
    backgroundColor,
    borderRadius,
    colors,
    coneSpread,
    edgeSensitivity,
    fillOpacity,
    glowColor,
    glowIntensity,
    glowRadius,
  ]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      data-sweep-active="false"
      className={`${styles.card} ${className}`.trim()}
      style={style}
    >
      <span className={styles.edgeLight} />
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
