import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  useCursor,
  RoundedBox,
} from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "react-router"; // ✅ dom 라우터
import type { Group } from "three";
import "../styles/home.scss";

/* 페이지 래퍼 페이드 (원하면 exit로 살짝 어둡게도 가능) */
const pageWrap: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
};

/* 씬(큐브+캔버스) 나갈 때 위로 + 페이드 */
const sceneExit: Variants = {
  exit: {
    y: "-12vh",
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

/** 우측 패널 링크 */
const links = [
  {
    name: "CascadingCard",
    route: "/cascading-card",
    gif: "cascading-card.gif",
  },
  {
    name: "CloudAnimation",
    route: "/cloud-animation",
    gif: "cloudAnimation.gif",
  },
  {
    name: "InteractionSlide",
    route: "/interaction-slide",
    gif: "interactionSlide.gif",
  },
  { name: "GradientHover", route: "/gradient-hover", gif: "gradientHover.gif" },
  { name: "HoverVideo", route: "/hover-video", gif: "hoverVideo.gif" },
];

/* ────────────── 큐브 ────────────── */
const Cube: React.FC<{ open: boolean; onToggle: () => void }> = ({
  open,
  onToggle,
}) => {
  const spinRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((state, delta) => {
    if (!spinRef.current) return;
    spinRef.current.rotation.y += 0.35 * delta; // 항상 회전
    spinRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
  });

  const { scale, tiltX, tiltY } = useSpring({
    scale: open ? 1.16 : hovered ? 1.06 : 1,
    tiltX: open ? -0.14 : hovered ? -0.1 : -0.04,
    tiltY: open ? 0.26 : hovered ? 0.18 : 0.08,
    config: { tension: 150, friction: 17 },
  });

  return (
    <a.group ref={spinRef}>
      <a.group scale={scale} rotation-x={tiltX} rotation-y={tiltY}>
        <RoundedBox
          args={[1.6, 1.6, 1.6]}
          radius={0.16}
          smoothness={8}
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onToggle}
        >
          <meshStandardMaterial
            color="#8f33d8"
            roughness={0.05}
            metalness={0.08}
          />
        </RoundedBox>
      </a.group>
    </a.group>
  );
};

/* ────────────── 우측 패널 ────────────── */
const RightPanel: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const listVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: 0.04, staggerChildren: 0.06 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 520, damping: 34, mass: 0.55 },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="tch-panel"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <motion.h3
            className="tch-title"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            UI Demos
          </motion.h3>

          <motion.ul
            className="tch-list"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={listVariants}
          >
            {links.map((it) => (
              <motion.li
                key={it.name}
                className="tch-item"
                variants={itemVariants}
              >
                <img
                  className="tch-panel-bgimg"
                  src={`/assets/gif/${it.gif}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                {/* onMouseDown으로 먼저 닫히고, 내비게이션은 이어서 수행됨 */}
                <Link
                  to={it.route}
                  className="tch-link"
                  aria-label={it.name}
                  onMouseDown={onClose}
                >
                  {it.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="tch-hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Click cube again to close
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

/* ────────────── 페이지 ────────────── */
const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const bgClass = useMemo(() => (open ? "tch-wrap open" : "tch-wrap"), [open]);

  return (
    <motion.div
      className={bgClass}
      variants={pageWrap}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* 배경 */}
      <div className="tch-bg-grad" />
      <div className="tch-bg-vignette" />
      <div className="tch-bg-grain" />

      {/* 우측 패널 (닫기 콜백 전달) */}
      <RightPanel open={open} onClose={() => setOpen(false)} />

      {/* 3D 씬: 퇴장 애니메이션 적용 래퍼 */}
      <motion.div className="tch-scene" variants={sceneExit}>
        <Canvas
          className="tch-canvas"
          shadows
          camera={{ position: [4.4, 3.2, 6], fov: 38 }}
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(0x000000, 0);
            scene.background = null;
          }}
          onPointerMissed={() => setOpen(false)}
        >
          <ambientLight intensity={0.65} />
          <directionalLight position={[6, 8, 6]} intensity={0.9} castShadow />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.22}
            scale={8}
            blur={2.5}
            far={2}
          />
          <Cube open={open} onToggle={() => setOpen((v) => !v)} />
        </Canvas>
      </motion.div>
    </motion.div>
  );
};

export default Home;
