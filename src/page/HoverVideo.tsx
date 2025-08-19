import React, { useRef, useState, useEffect, memo } from "react";
import "../styles/hoverVideo.scss";

type VideoTileProps = {
  src: string;
  poster?: string;
  className?: string;
  multi?: boolean;
};

const getLabelFromSrc = (src: string, fallback = "1") => {
  const m = src.match(/(\d+)\.mp4$/);
  return m?.[1] ?? fallback;
};

const VideoTile: React.FC<VideoTileProps> = memo(
  ({ src, poster, className, multi }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const label = getLabelFromSrc(src);

    // 뷰포트 밖 자동 정지
    useEffect(() => {
      const el = videoRef.current;
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting && !el.paused) {
            el.pause();
            el.currentTime = 0;
            setIsPlaying(false);
          }
        },
        { threshold: 0.1 }
      );
      io.observe(el);
      return () => io.disconnect();
    }, []);

    const playFromStart = () => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = 0;
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };

    const pauseAndReset = () => {
      const v = videoRef.current;
      if (!v) return;
      v.pause();
      v.currentTime = 0;
      setIsPlaying(false);
    };

    const togglePlay = () => {
      const v = videoRef.current;
      if (!v) return;
      if (v.paused)
        v.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      else {
        v.pause();
        setIsPlaying(false);
      }
    };

    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    return (
      <div
        className={`videoContent metal ${isPlaying ? "isPlaying" : ""} ${
          className ?? ""
        }`}
        role="button"
        tabIndex={0}
        aria-label={`영상 ${label} (호버/탭으로 재생/정지)`}
        onMouseEnter={playFromStart}
        onMouseLeave={pauseAndReset}
        onFocus={playFromStart}
        onBlur={pauseAndReset}
        onClick={togglePlay}
        onKeyDown={onKeyDown}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          loop
        />
        {/* 메탈릭 오버레이 (번호 + 텍스트) */}
        <div className="metalLabel" aria-hidden="true">
          <span className="badge">{label}</span>
          <div className="meta">
            <h4 className="title">MOLT-BOX</h4>
            <p className="desc">Hover Video metalic motion</p>
            {multi ? (
              <p className="desc"></p>
            ) : (
              <p className="desc">
                About A collection of UI components that evolve, experiment, and
                express — inspired by visual design, interactivity, and
                transformation.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);
VideoTile.displayName = "VideoTile";

const HoverVideo: React.FC = () => {
  // public/videos/1~6.mp4
  const cols = [
    ["/videos/1.mp4", "/videos/2.mp4"],
    ["/videos/3.mp4"],
    ["/videos/4.mp4", "/videos/5.mp4"],
    ["/videos/6.mp4"],
  ];

  return (
    <div className="hoverVideoContainer metal">
      <div className="grid">
        {cols.map((col, colIdx) => (
          <div
            key={colIdx}
            className={
              col.length === 1 ? "gridContainer" : "gridContainerVertical"
            }
          >
            {col.map((src, i) => (
              <VideoTile
                key={`${colIdx}-${i}`}
                src={src}
                multi={col.length === 1 ? false : true}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoverVideo;
