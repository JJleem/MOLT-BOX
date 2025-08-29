// FullPageSections.tsx
import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard, Pagination, EffectFade } from "swiper/modules";
// 필요 시: import "swiper/css/effect-fade";

type Props = {
  slides: React.ReactNode[];
  preload?: number; // 활성 주변 몇 개까지 미리 마운트
  initialIndex?: number;
  speed?: number;
  effect?: "slide" | "fade";
};

const FullPageSections: React.FC<Props> = ({
  slides,
  preload = 0,
  initialIndex = 0,
  speed = 900,
  effect = "slide",
}) => {
  const [active, setActive] = useState(initialIndex);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);

  const mounted = useMemo(() => {
    const set = new Set<number>();
    // 항상 활성 슬라이드
    set.add(active);
    // 전환 중이면 이전(떠나는) 슬라이드도 유지
    if (isSliding && leaving != null) set.add(leaving);
    // 주변 preload
    for (let i = active - preload; i <= active + preload; i++) {
      if (i >= 0 && i < slides.length) set.add(i);
    }
    return set;
  }, [active, leaving, isSliding, preload, slides.length]);

  return (
    <div className="fullpage-container">
      <Swiper
        className="fullpage-swiper"
        direction="vertical"
        speed={speed}
        roundLengths
        resistanceRatio={0.6}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
          thresholdDelta: 35,
        }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        simulateTouch
        watchSlidesProgress
        observer
        observeParents
        effect={effect}
        fadeEffect={effect === "fade" ? { crossFade: true } : undefined}
        modules={[Mousewheel, Keyboard, Pagination, EffectFade]}
        // 전환 시작: 이전 슬라이드 유지
        onSlideChangeTransitionStart={(sw) => {
          setIsSliding(true);
          // Swiper가 이 시점에 previousRealIndex를 들고 있어요
          setLeaving(sw.previousIndex);
        }}
        // 활성 인덱스 갱신 (여기서 해도 되고 onSlideChange에서 해도 무방)
        onSlideChange={(sw) => {
          setActive(sw.realIndex);
          document.documentElement.classList.add("is-sliding");
        }}
        // 전환 종료: 이전 슬라이드 언마운트
        onSlideChangeTransitionEnd={() => {
          setIsSliding(false);
          setLeaving(null);
          document.documentElement.classList.remove("is-sliding");
        }}
      >
        {slides.map((node, i) => (
          <SwiperSlide key={i}>
            <div className="fullpage-slide-inner">
              {mounted.has(i) ? node : <div className="slide-placeholder" />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullPageSections;
