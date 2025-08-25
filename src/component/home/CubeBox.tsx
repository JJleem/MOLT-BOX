// CubeBox.tsx
import React, { useState } from "react";
import { Link } from "react-router";
import "../../styles/cubeBox.scss";

const links = [
  { name: "CascadingCard", route: "/cascading-card" },
  { name: "CloudAnimation", route: "/cloud-animation" },
  { name: "InteractionSlide", route: "/interaction-slide" },
  { name: "GradientHover", route: "/gradient-hover" },
  { name: "HoverVideo", route: "/hover-video" },
];

const CubeBox = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="scene" onClick={() => setOpen(!open)}>
      <div className={`cube ${open ? "open" : ""}`}>
        <div className="face front">Click me</div>
        <div className="face back">Back</div>
        <div className="face right">Right</div>
        <div className="face left">Left</div>
        <div className="face top">Top</div>
        <div className="face bottom">Bottom</div>

        {/* 안쪽 콘텐츠 */}
        {open && (
          <div className="cube-content">
            {links.map((l, i) => (
              <Link
                to={l.route}
                key={l.name}
                className="cube-link"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {l.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CubeBox;
