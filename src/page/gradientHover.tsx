import React, { useRef, useState } from "react";
import "../styles/gradientHover.scss";

const GradientHover = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isNear, setIsNear] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const buffer = 100; // px 거리 내 근처로 간주
    const isInsideExtended =
      e.clientX >= rect.left - buffer &&
      e.clientX <= rect.right + buffer &&
      e.clientY >= rect.top - buffer &&
      e.clientY <= rect.bottom + buffer;

    setIsNear(isInsideExtended);

    containerRef.current?.style.setProperty("--x", `${x}%`);
    containerRef.current?.style.setProperty("--y", `${y}%`);
  };

  const handleMouseLeave = () => {
    setIsNear(false);
    setIsHovered(false);
  };

  return (
    <div className="gradient-hover-wrapper" onMouseMove={handleMouseMove}>
      <div
        className={`gradient-hover-target ${isHovered ? "hovered" : ""} ${
          isNear ? "near" : ""
        }`}
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <span className="content">Hover me</span>
      </div>
    </div>
  );
};

export default GradientHover;
