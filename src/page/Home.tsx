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
import { Link } from "react-router"; // ✅ DOM 라우터
import type { Group } from "three";
import "../styles/home.scss";

/** 우측 패널에 보여줄 링크들 */
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

/* ────────────── 큐브 (단일 메쉬, 전면 튀어나옴 제거) ────────────── */
const Cube: React.FC<{ open: boolean; onToggle: () => void }> = ({
  open,
  onToggle,
}) => {
  const spinRef = useRef<Group>(null); // ⬅️ 바깥(항상 회전)
  const [hovered, setHovered] = useState(false);
  useCursor(hovered); // hover 시 cursor: pointer

  // ✅ 항상 회전 (호버/클릭 여부와 무관)
  useFrame((state, delta) => {
    if (!spinRef.current) return;
    const ySpeed = 0.35; // rad/sec
    spinRef.current.rotation.y += ySpeed * delta;
    // 살짝 숨쉬는 느낌의 x 흔들림(옵션)
    spinRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
  });

  // ✅ 클릭(open) 시 더 크게, 호버는 살짝 — 회전과 독립
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
          onClick={onToggle} // ⬅️ 클릭하면 open 토글 → 줌‑인/아웃
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
const RightPanel: React.FC<{ open: boolean }> = ({ open }) => {
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
      transition: {
        type: "spring" as const,
        stiffness: 520,
        damping: 34,
        mass: 0.55,
      },
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
                layout="position" // 재배치도 자연스럽게
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
              >
                <img
                  className="tch-panel-bgimg"
                  src={`/assets/gif/${it.gif}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <Link to={it.route} className="tch-link" aria-label={it.name}>
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
    <div className={bgClass}>
      {/* 고급 배경 레이어 */}
      <div className="tch-bg-grad" />
      <div className="tch-bg-vignette" />
      <div className="tch-bg-grain" />

      {/* 우측 패널 */}
      <RightPanel open={open} />

      {/* 3D 씬 */}
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
          gl.setClearColor(0x000000, 0); // ✅ 완전 투명(clear alpha 0)
          scene.background = null; // ✅ 씬 배경 명시적으로 제거
        }}
        onPointerMissed={() => setOpen(false)} // ✅ 큐브 외부 클릭 → 축소
      >
        {/* ✅ 씬 배경 없앰: 아래 줄을 제거해야 투명 */}
        {/* <color attach="background" args={["transparent"]} />  <-- 삭제 */}

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
    </div>
  );
};

export default Home;
