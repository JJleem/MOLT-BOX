import { useState } from "react";
import Header from "../component/interactionSlice/Header";
import SlideContainer from "../component/interactionSlice/SlideContainer";
import Pagination from "../component/interactionSlice/Pagination";
import "../styles/interactionSlide.scss";

const InteractionSlide = () => {
  const [activePage, setActivePage] = useState(1);

  return (
    <main className="mainContainer">
      <Header />
      <SlideContainer activePage={activePage} />
      <Pagination activePage={activePage} setActivePage={setActivePage} />
    </main>
  );
};

export default InteractionSlide;
