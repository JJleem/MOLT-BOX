import React from "react";
import { Route, Routes, useLocation } from "react-router";
import CascadingCard from "../page/CascadingCard";
import Home from "../page/Home";
import CloudAnimation from "../page/CloudAnimation";
import InteractionSlide from "../page/InteractionSlice";
import GradientHover from "../page/gradientHover";
import HoverVideo from "../page/HoverVideo";
import { AnimatePresence, motion, type Variants } from "framer-motion";

export default function RouterView() {
  const location = useLocation();
  const pageIn: Variants = {
    initial: { y: "12vh", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      y: "6vh",
      opacity: 0,
      transition: { duration: 0.35, ease: "easeIn" },
    },
  };
  return (
    <main className="main">
      <div className="global-bg" />
      <AnimatePresence mode="wait" initial={false}>
        {/* ⬇️ Routes를 motion.div로 감싸고, 여기에 key를 준다 */}
        <motion.div
          key={location.pathname}
          variants={pageIn}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            minWidth: "100vw",
            minHeight: "100vh",
          }}
          // 페이지별 기본 높이 보장
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/cascading-card" element={<CascadingCard />} />
            <Route path="/cloud-animation" element={<CloudAnimation />} />
            <Route path="/interaction-slide" element={<InteractionSlide />} />
            <Route path="/gradient-hover" element={<GradientHover />} />
            <Route path="/hover-video" element={<HoverVideo />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
