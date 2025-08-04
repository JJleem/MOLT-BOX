import React from "react";
import ThreeJsCloudAnimation from "../component/cloudanimation/ThreeJsCloudAnimation";
import CloudAnimationSkyBlue from "../component/cloudanimation/ThreeJsCloudAnimationSkyBlue";
import "../styles/cloudAnimation.scss";
const CloudAnimation = () => {
  return (
    <div className="cloud-animation-container">
      <div className="cloud-animation-container-inner">
        <ThreeJsCloudAnimation />
      </div>
      <div className="cloud-animation-container-inner">
        <CloudAnimationSkyBlue />
      </div>
    </div>
  );
};

export default CloudAnimation;
