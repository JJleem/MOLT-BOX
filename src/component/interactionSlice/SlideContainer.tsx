import React, { useState, useEffect } from "react";
import "../../styles/interactionSlide.scss";
import SlideItem from "./SlideItem";

interface SlideContainerProps {
  activePage: number;
}

const getItemsPerPage = (): number => {
  const width = window.innerWidth;
  if (width <= 800) return 2;
  if (width <= 1200) return 4;
  return 8;
};

const items = new Array(40).fill(null);

const SlideContainer: React.FC<SlideContainerProps> = ({ activePage }) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // activePage에 따라 이동할 translateX 값을 계산 (예: activePage 1이면 0, 2이면 -100% - gap 등)
  const slideTranslate = `calc(-${(activePage - 1) * 100}% - ${
    (activePage - 1) * 10
  }px)`;

  return (
    <div className="Container">
      <div className="Slide">
        <div
          className="SlideContainer"
          style={{ transform: `translateX(${slideTranslate})` }}
        >
          {items.map((_, index) => (
            <SlideItem
              key={index}
              index={index}
              activePage={activePage}
              itemsPerPage={itemsPerPage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideContainer;
