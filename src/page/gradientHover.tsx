import React, { useEffect, useRef, useState } from "react";
import "../styles/gradientHover.scss";

const GradientHover: React.FC = () => {
  const refs = useRef<HTMLDivElement[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [near, setNear] = useState<boolean[]>([false, false, false]);
  const BUFFER = 100; // px

  // 전역 마우스 무브 핸들러
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const newNear = refs.current.map((el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return (
          e.clientX >= r.left - BUFFER &&
          e.clientX <= r.right + BUFFER &&
          e.clientY >= r.top - BUFFER &&
          e.clientY <= r.bottom + BUFFER
        );
      });
      setNear(newNear);

      newNear.forEach((isN, i) => {
        if (isN || hovered === i) {
          const el = refs.current[i];
          const r = el.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          const y = ((e.clientY - r.top) / r.height) * 100;
          el.style.setProperty("--x", `${x}%`);
          el.style.setProperty("--y", `${y}%`);
        }
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [hovered]);

  return (
    <div className="gradient-hover-wrapper">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) {
              refs.current[i] = el;
            }
          }}
          className={`gradient-hover-target ${near[i] ? "near" : ""} ${
            hovered === i ? "hovered" : ""
          }`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <span className="content">Box {i + 1}</span>
        </div>
      ))}
    </div>
  );
};

export default GradientHover;
