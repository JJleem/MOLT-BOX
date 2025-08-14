import React, { useEffect, useRef, useState } from "react";
import "../styles/gradientHover.scss";

const GradientHover: React.FC = () => {
  const refs = useRef<HTMLDivElement[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [near, setNear] = useState<boolean[]>(() => Array(3).fill(false));

  useEffect(() => {
    const BUFFER = 90; // 근접 반응 거리(px)
    const THRESHOLD = 0.22; // 이 값보다 멀면 보이지 않음
    const EDGE_MARGIN = 6; // 테두리에 닿도록 여유치

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
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

        refs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();

          const px = e.clientX - r.left;
          const py = e.clientY - r.top;

          const x = (px / r.width) * 100;
          const y = (py / r.height) * 100;
          el.style.setProperty("--x", `${x}%`);
          el.style.setProperty("--y", `${y}%`);

          // 요소 외부 최소거리
          const dx =
            e.clientX < r.left
              ? r.left - e.clientX
              : e.clientX > r.right
              ? e.clientX - r.right
              : 0;
          const dy =
            e.clientY < r.top
              ? r.top - e.clientY
              : e.clientY > r.bottom
              ? e.clientY - r.bottom
              : 0;
          const dist = Math.hypot(dx, dy);

          // 근접도 0~1 (threshold 적용)
          const proximity = Math.max(0, Math.min(1, 1 - dist / BUFFER));
          const gated =
            proximity <= THRESHOLD
              ? 0
              : (proximity - THRESHOLD) / (1 - THRESHOLD);
          const glow = Math.pow(gated, 0.6);

          // hover면 전체 on → glow=1
          el.style.setProperty("--glow", (hovered === i ? 1 : glow).toString());

          // 스팟 반경(테두리에 닿도록)
          const edge = Math.min(px, r.width - px, py, r.height - py);
          const spot = Math.max(56, edge + EDGE_MARGIN); // 조금 키워서 더 은은하게
          el.style.setProperty("--spot", `${spot}px`);
          // ✨ 페더: 근접할수록 더 부드럽게 퍼짐, hover면 0
          const feather = hovered === i ? 0 : Math.round(12 + 28 * glow); // 12~40px
          el.style.setProperty("--feather", `${feather}px`);
        });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [hovered]);

  return (
    <div className="gradient-hover-wrapper">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          className={`gradient-hover-target ${near[i] ? "near" : ""} ${
            hovered === i ? "hovered" : ""
          }`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)} // ← hover 해제 시 원복
        >
          <span className="content"> </span>
        </div>
      ))}
    </div>
  );
};

export default GradientHover;
