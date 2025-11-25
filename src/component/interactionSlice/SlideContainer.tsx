/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import "../../styles/interactionSlide.scss";
// SlideItem 컴포넌트와 그 안에서 정의한 PostData 타입을 가져옵니다.
// (SlideItem.tsx에서 'export interface PostData'가 되어 있어야 합니다)
import SlideItem, { type PostData } from "./SlideItem";

interface SlideContainerProps {
  activePage: number;
}

const getItemsPerPage = (): number => {
  const width = window.innerWidth;
  if (width <= 800) return 2;
  if (width <= 1200) return 4;
  return 8;
};

// const items = new Array(40).fill(null); // <-- 삭제: 이제 이 더미 배열은 필요 없습니다.

const SlideContainer: React.FC<SlideContainerProps> = ({ activePage }) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage());
  const [slideData, setSlideData] = useState<PostData[]>([]); // API 데이터를 담을 상태

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // API 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const posts = await postResponse.json();

        const userResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const users = await userResponse.json();

        const formattedData = posts.map((post: any, i: number) => {
          const user = users.find((u: any) => u.id === post.userId) || users[0];
          return {
            id: post.id,
            title:
              post.title.slice(0, 20) + (post.title.length > 20 ? "..." : ""),
            body: post.body,
            userName: user.name,
            date: `2025-01-${String((i % 30) + 1).padStart(2, "0")}`,
          };
        });

        setSlideData(formattedData.slice(0, 40)); // 40개만 자르기
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // 슬라이드 이동 계산
  const slideTranslate = `calc(-${(activePage - 1) * 100}% - ${
    (activePage - 1) * 10
  }px)`;

  // 데이터 로딩 중일 때 처리 (선택사항)
  if (slideData.length === 0) {
    return <div className="Container">Loading...</div>;
  }

  return (
    <div className="Container">
      <div className="Slide">
        <div
          className="SlideContainer"
          style={{ transform: `translateX(${slideTranslate})` }}
        >
          {/* items 대신 slideData를 사용해 렌더링합니다 */}
          {slideData.map((item, index) => (
            <SlideItem
              key={item.id} // 고유한 ID를 key로 사용하는 것이 성능에 더 좋습니다
              index={index}
              activePage={activePage}
              itemsPerPage={itemsPerPage}
              data={item} // <--- 중요: 데이터를 자식 컴포넌트에게 전달!
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideContainer;
