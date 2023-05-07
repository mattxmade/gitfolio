import React from "react";

import Svg from "./Svg";
const { WebpackIcon } = Svg;

const Icon = (props) => {
  switch (props.name) {
    case "HTML":
      return <i className="tech-icon fa-brands fa-html5" />;
    case "CSS":
      return <i className="tech-icon fa-brands fa-css3-alt" />;
    case "JavaScript":
      return <i className="tech-icon fa-brands fa-square-js" />;
    case "React":
      return <i className="tech-icon fa-brands fa-react" />;
    case "ThreeJS":
      return <i className="tech-icon fa-solid fa-cube" />;
    case "Webpack":
      return (
        <i className="tech-icon fa-brands fa-webpack">
          <WebpackIcon />
        </i>
      );
  }
};

export default Icon;
