// src/pages/CascadingCard.tsx
import React from "react";
import "../styles/cascadingCard.scss";
import "../styles/fullpage.scss"; // ⬅️ 추가
import FullPageSections from "../component/cascadingCard/FullPageSection";
import CascadingCardOrigin from "../component/cascadingCard/cascadingOrigin";
import CascadingCardReverse from "../component/cascadingCard/cascadingReverse";

const CascadingCard = () => {
  return (
    <FullPageSections
      slides={[
        <CascadingCardOrigin key="origin" />,
        <CascadingCardReverse key="reverse" />,
      ]}
      preload={1} // 0=진짜 활성 섹션만 렌더, 1=이웃까지 미리 렌더(전환 더 매끈)
      speed={900} // 전환 속도 (취향대로)
    />
  );
};

export default CascadingCard;
