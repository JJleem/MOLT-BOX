import React from "react";
import { Route, Routes, useLocation } from "react-router";
import CascadingCard from "../page/CascadingCard";
import Home from "../page/Home";
import CloudAnimation from "../page/CloudAnimation";
import InteractionSlide from "../page/InteractionSlice";
import GradientHover from "../page/gradientHover";
import HoverVideo from "../page/HoverVideo";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import ScrollInfo from "../page/ScrollInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatBot from "../page/ChatBot";

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
  const queryClient = new QueryClient();
  return (
    <main className="main">
      <div className="tch-bg-metal is-brushed" />
      <QueryClientProvider client={queryClient}>
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
              <Route path="/scroll-info" element={<ScrollInfo />} />
              <Route path="/chat-bot" element={<ChatBot />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </QueryClientProvider>
    </main>
  );
}
