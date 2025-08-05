import React from "react";
import { Link } from "react-router";
import "../styles/home.scss";
const UiSourceCategory = [
  {
    name: "CascadingCard",
    route: "/cascading-card",
  },
  {
    name: "CloudAnimation",
    route: "/cloud-animation",
  },
  {
    name: "InteractionSlide",
    route: "/interaction-slide",
  },
  {
    name: "GradientHover",
    route: "/gradient-hover",
  },
];

const Home = () => {
  return (
    <div className="main">
      <div className="ui-source-category">
        <div className="ui-source-category-list">
          {UiSourceCategory.map((item) => (
            <Link
              to={item.route}
              key={item.name}
              className="ui-source-category-item"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
