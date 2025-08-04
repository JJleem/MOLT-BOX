import React from "react";
import { Route, Routes } from "react-router";
import CascadingCard from "../page/CascadingCard";
import Home from "../page/Home";

export default function RouterView() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cascading-card" element={<CascadingCard />} />
      </Routes>
    </main>
  );
}
