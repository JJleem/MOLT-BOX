import React from "react";
import "../styles/cascadingCard.scss";
const CascadingCard = () => {
  const containerCount = 5;
  const cardCount = 10;
  return (
    <div className="test2-container">
      <div className="container">
        {Array.from({ length: containerCount }).map((_, i) => {
          return (
            <div
              key={i}
              className={`card-container `}
              style={{
                animationDuration: `${i % 2 === 0 ? 20 : 15}s`,
              }}
            >
              {Array.from({ length: cardCount }).map((_, j) => {
                return (
                  <div className="card" key={j}>
                    <svg
                      className="testsvg"
                      fill="none"
                      viewBox="0 0 467 467"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        shapeRendering: "geometricPrecision",
                        transform: "translate3d(-80px,10px,0) scale(1.5)",
                        willChange: "transform, filter",
                        filter: "saturate(200%) blur(20px) blur(50px)",
                      }}
                    >
                      <g className="transform-gpu">
                        <path
                          className="will-change-transform"
                          d="M407.64 132.674 511.646 108l81.075 17.082V326.27H419.103l-31.111-98.696 19.648-94.9Z"
                          fill="#015ae0"
                          data-svg-origin="387.99200439453125 108"
                          transform="matrix(1,0,0,1,29.82775,0.70178)"
                          style={{
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transformOrigin: "0px 0px",
                          }}
                        ></path>
                        <path
                          className="will-change-transform"
                          d="m357.667 186.498 72.448-19.143 56.475 13.253v156.09H365.651l-21.671-76.572 13.687-73.628Z"
                          fill="#65adff"
                          data-svg-origin="343.9800109863281 167.35499572753906"
                          transform="matrix(1,0,0,1,28.03894,-1.29587)"
                          style={{
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transformOrigin: "0px 0px",
                          }}
                        ></path>
                        <path
                          className="will-change-transform"
                          d="m471.471 217.57 58.714-9.647 45.77 6.679v78.666h-98.013l-17.563-38.591 11.092-37.107Z"
                          fill="#60bff7"
                          data-svg-origin="460.3790283203125 207.92300415039062"
                          transform="matrix(1,0,0,1,-16.34311,23.20275)"
                          style={{
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transformOrigin: "0px 0px",
                          }}
                        ></path>
                        <path
                          className="will-change-transform"
                          d="m160.042 229.351 80.266-16.432 62.569 11.376v133.988H168.888l-24.009-65.73 15.163-63.202Z"
                          fill="#1192ce"
                          data-svg-origin="144.87899780273438 212.91900634765625"
                          transform="matrix(1,0,0,1,20.31005,-4.04339)"
                          style={{
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transformOrigin: "0px 0px",
                          }}
                        ></path>
                        <path
                          className="will-change-transform"
                          d="m290.066 207.03 73.697-19.143 57.449 13.253v156.091H298.188l-22.044-76.573 13.922-73.628Z"
                          fill="#0084db"
                          data-svg-origin="276.14398193359375 187.88699340820312"
                          transform="matrix(1,0,0,1,29.43979,0.82929)"
                          style={{
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transformOrigin: "0px 0px",
                          }}
                        ></path>
                        {/* 맨왼쪽*/}
                        <path
                          className="will-change-transform"
                          d="m136.004 208.083 73.697-19.143 57.449 13.253v156.09H144.127l-22.045-76.572 13.922-73.628Z"
                          fill="#008cff"
                          data-svg-origin="122.08200073242188 188.9399871826172"
                          transform="matrix(1,0,0,1,-4.67145,-15.64712)"
                          style={{
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transformOrigin: "0px 0px",
                          }}
                        ></path>

                        <path
                          className="will-change-transform"
                          d="m243.752 200.799 86.172-18.321 67.174 12.683v149.388H253.249l-25.776-73.284 16.279-70.466Z"
                          fill="#72cbff"
                          data-svg-origin="227.47299194335938 182.47799682617188"
                          transform="matrix(1,0,0,1,-29.42252,31.98614)"
                          style={{
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transformOrigin: "0px 0px",
                          }}
                        ></path>

                        <path
                          className="will-change-transform"
                          d="m417.299 212.382 39.278-7.668 30.618 5.309v62.518h-65.567l-11.749-30.669 7.42-29.49Z"
                          fill="#00b7ff"
                          data-svg-origin="409.8790588378906 204.71400451660156"
                          transform="matrix(1,0,0,1,-29.5497,-31.96354)"
                          style={{
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transformOrigin: "0px 0px",
                          }}
                        ></path>

                        <path
                          className="will-change-transform"
                          d="m145.653 194.349 93.505-19.143 72.89 13.253v156.09h-156.09l-27.97-76.573 17.665-73.627Z"
                          fill="#00d5f1"
                          data-svg-origin="127.98797607421875 175.20599365234375"
                          transform="matrix(1,0,0,1,-31.78307,23.99046)"
                          style={{
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transformOrigin: "0px 0px",
                          }}
                        ></path>

                        <path
                          className="will-change-transform"
                          d="m117.665 194.349 93.505-19.143 72.89 13.253v156.09H127.97L100 267.976l17.665-73.627Z"
                          fill="#90dfff"
                          data-svg-origin="100 175.20599365234375"
                          transform="matrix(1,0,0,1,-15.79734,22.8095)"
                          style={{
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transformOrigin: "0px 0px",
                          }}
                        ></path>
                      </g>
                    </svg>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CascadingCard;
