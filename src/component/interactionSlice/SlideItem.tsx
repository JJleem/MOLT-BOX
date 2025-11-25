import React from "react";
import "../../styles/interactionSlide.scss";

// API에서 받아올 데이터 타입 정의
export interface PostData {
  id: number;
  title: string;
  body: string;
  userName: string; // API 데이터를 가공해서 넣어줄 예정
  date: string; // API 데이터를 가공해서 넣어줄 예정
}

interface SlideItemProps {
  index: number;
  activePage: number;
  itemsPerPage: number;
  data: PostData; // 부모로부터 받을 데이터 객체
}

const SlideItem: React.FC<SlideItemProps> = ({
  index,
  activePage,
  itemsPerPage,
  data,
}) => {
  // 계산: 현재 페이지에서 보여져야 하는 아이템 인덱스 범위
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = activePage * itemsPerPage - 1;
  const isActive = index >= startIndex && index <= endIndex;

  // [이미지 API] Picsum의 seed 기능을 사용하여 인덱스별로 고유하지만 변하지 않는 이미지 생성
  // 가로 600px, 세로 400px 이미지
  const imageUrl = `https://picsum.photos/seed/${index + 1}/600/400`;

  return (
    <div className="SlideItem" style={{ opacity: isActive ? 1 : 0.2 }}>
      <img
        className="img"
        src={imageUrl}
        alt={`slide-${data.id}`}
        loading="lazy" // 성능 최적화
      />
      <div className="desc">
        {/* API에서 받아온 데이터 바인딩 */}
        <h3>{data.title}</h3>
        <span>{data.userName}</span>
        <p>{data.body}</p>
        <h5>{data.date}</h5>
      </div>
    </div>
  );
};

export default SlideItem;
