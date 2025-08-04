import React from "react";
import { Route, Routes } from "react-router";
import CascadingCard from "../page/CascadingCard";
import Home from "../page/Home";
import CloudAnimation from "../page/CloudAnimation";
import InteractionSlide from "../page/InteractionSlice";

export default function RouterView() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cascading-card" element={<CascadingCard />} />
        <Route path="/cloud-animation" element={<CloudAnimation />} />
        <Route path="/interaction-slide" element={<InteractionSlide />} />
      </Routes>
    </main>
  );
}
